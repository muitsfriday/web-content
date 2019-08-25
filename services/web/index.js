const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const jwtVerify = require('express-jwt')
const cookieParser = require('cookie-parser')

const app = express()
const auth = jwtVerify({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: req => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    } else if (req.cookies && req.cookies.jwt) {
      return req.cookies.jwt
    }
    return null
  }
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public'))

app.engine('html', (filePath, options, callback) => {
  console.log('filePath', filePath, )
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)

    let rendered = content.toString()
    let includePattern = /\[\[\s*(.+?)\s*\]\]/g
    let matches
    while (matches = includePattern.exec(rendered)) {
      const matchedPattern = matches[0]
      const fileName = matches[1]
      const path = `${__dirname}/views/${fileName}`
      const data = fs.readFileSync(path)
      rendered = rendered.replace(matchedPattern, data)
    }

    for (let key in options.data || {}) {
      rendered = rendered.replace('{{ ' + key + ' }}', options.data[key])
    }
    return callback(null, rendered)
  })
})
app.set('views', './views')
app.set('view engine', 'html')

const serviceArticle = process.env.ARTICLE_API_PATH

const renderArticleCard = article => {
  return `
  <a href="/${article._id}">
    <div class="card">
      <div class="card-body">
        <h2>${article.title}</h2>
        <div class="card-info">
          updated: <span>${article.updateAt}</span>
        </div>
      </div>
    </div>
  </a>
  `
}

app.get('/', auth, (req, res) => {
  const user = req.user

  fetch(serviceArticle)
    .then(res => res.json())
    .then(data => {
      const articles = data.list.map(renderArticleCard).join('')
      res.render('index', {
        data: {
          test: 'test template',
          articles: articles,
          isLoginClass: user ? '' : 'd-none',
          isNotLoginClass: user ? 'd-none' : '',
          username: user ? user.username : ''
        }
      })
    })
})

app.get('/:id', auth, (req, res) => {
  const user = req.user

  fetch(`${serviceArticle}/${req.params.id}`)
    .then(res => res.json())
    .then(json => {
      const article = json.data
      res.render('article', {
        data: {
          title: article.title,
          content: article.content,
          author: article.username,
          isLoginClass: user ? '' : 'd-none',
          isNotLoginClass: user ? 'd-none' : '',
          username: user ? user.username : ''
        }
      })
    })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const body = JSON.stringify({
    username,
    password
  })
  fetch('http://user:3000/auth', {
    method: 'POST',
    body: body,
    headers: { 'Content-Type': 'application/json' }
  })
    .then(r => r.json())
    .then(data => {
      if (!data.token) {
        let errMessage = ''
        switch (data.err) {
          case 'USER_NOT_FOUND':
          case 'INVALID_PASSWORD':
            errMessage = 'Username หรือ password ผิดพลาด'
            break
          default:
            errMessage = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
        }
        return res.json({
          status: false,
          message: errMessage
        })
      }
      return res.json({
        status: true,
        token: data.token
      })
    })
    .catch(err =>
      res.json({
        status: false,
        message: 'unexpected error'
      })
    )
})

app.listen(process.env.PORT, () => {
  console.log('service frontend start')
})
