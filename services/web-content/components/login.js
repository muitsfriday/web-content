import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { onLogin, onLogout, onJwtReceived } from '../store'

const Wrapper = styled.div`
	width: 100%;
	max-width: 500px;
`

const Container = styled.div`
	margin: 20px;
	border: 1px #ccc solid;
	border-radius: 5px;
	background-color: white;
	color: #434343;
`

const InnerWrapper = styled.div`
	padding: 20px;
`


const Head = styled.h1`
	font-size: 31px;
	text-align: center;
	font-family: ${props => props.theme.font.family};
	color: #434343;
`

const InputText = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 10px 15px;
	font-size: 21px;
	border-radius: 5px;
	box-shadow: none;
	border: solid 1px #ccc;
	margin-bottom: 24px;
`

const Button = styled.button`
	width: 100%;
	box-sizing: border-box;
	padding: 10px 15px;
	font-size: 18px;
	background-color: #1f82a1;
	color: white;
	border-radius: 5px;

	&:hover {
		background-color: #196982;
	}
`


const LoginModal = (props) => {


	const [username, setUsername] = useState(props.username || '')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')


	const handleUsernameChange = (e) => { 
		setUsername(e.target.value) 
	}
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleLogin = () => {
		// request
		props.login(username, password, (response) => {
			if (!response.data.status) setError(response.data.error)
			else setError('')
		})
	}

	const handleLogout = () => {
		props.logout()
	}

	const getLoginBox = () => (
		<InnerWrapper>
				<Head>Sign In</Head>
				{
					error 
						? (<p>{error}</p>) 
						: null
				}
				<InputText value={username} onChange={handleUsernameChange} placeholder="Username" />
				<InputText value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
				<Button onClick={handleLogin} >Login</Button>
		</InnerWrapper>
	)

	const getLogoutBox = () => (
		<InnerWrapper>
				<p>jwt: {props.jwt}</p>
				<Button onClick={handleLogout} >Logout</Button>
		</InnerWrapper>
	)

	return (
		<Wrapper>
			<Container>
				{
					props.jwt ? getLogoutBox() : getLoginBox()
				}
			</Container>
		</Wrapper>
	)
}

const mapStoreToProps = store => {
	return {
		jwt: store.jwt,
	}
}

const mapActionToProps = {
	login: onLogin,
	logout: onLogout,
	setJwt: onJwtReceived
}

export default connect(mapStoreToProps, mapActionToProps)(LoginModal)