import React from 'react'
import { connect } from 'react-redux'
import cookie from 'cookie'
import axios from 'axios'
import styled from 'styled-components'

import Toolbar from '../../components/toolbar'
import Layout from '../../components/layout'
import ArticleCard from '../../components/article-card'


const Heading = styled.h2`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const AdminIndex = (props) => {
	const articles = props.articles || []
	console.log("articles", articles)
	return (
		<>
			<Toolbar/>
			<Layout>
				<Heading>Articles</Heading>
				{articles.map(article => <ArticleCard key={article.slug} data={article}/>)}
			</Layout>
		</>
	)
}

AdminIndex.getInitialProps = ({ req }) => {
	let jwt = ''
	// server side
	if (req && req.headers) {
		const cookies = cookie.parse(req.headers.cookie)
		jwt = JSON.parse(cookies.jwt).jwt
	}

  return axios.get('http://localhost:3000/api/admin/article', {
		headers: {
			Authorization: `Bearer ${jwt}`
		}
	}).then(response => {
    return { 
      articles: response.data.data
    }
  })
}

const mapStateToProps = (state) => ({
	jwt: state.jwt
})

const mapActionToProps = {}


export default connect(mapStateToProps, mapActionToProps)(AdminIndex)