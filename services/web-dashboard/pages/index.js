import Toolbar from '../components/toolbar'
import Login from '../components/login'
import axios from 'axios'
import Link from 'next/link'

function Home(props) {
  return (
    <div>
      <Toolbar title="homepage" />
      <h1>Welcome to Next.js!, Hello World 2</h1>
      <p>this is my first next.js</p>
      {
        props.articles.map(article => {
          return (
            <div>
              <Link href={`/article/${article._id}`}>{ article.title }</Link>
            </div>
          )
        })
      }
    </div>
  )
}

Home.getInitialProps = ({ req }) => {
  return axios.get('http://localhost:3000/api/article').then(response => {
    return { 
      articles: response.data.data
    }
  })
}

export default Home
