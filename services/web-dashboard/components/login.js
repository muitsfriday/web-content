import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { escapeComponent } from 'uri-js';

const Wrapper = styled.div`
	width: 100%;
	max-width: 500px;
`

const Container = styled.div`
	margin: 20px;
	border: 1px #ccc solid;
	border-radius: 5px;
`

const InnerWrapper = styled.div`
	padding: 20px;
`


const Head = styled.h1`
	font-size: 31px;
	text-align: center;
	font-family: ${props => props.theme.font.family};
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


export default (props) => {
	const [username, setUsername] = useState(props.username || '')
	const [password, setPassword] = useState('')

	const handleUsernameChange = (e) => { 
		setUsername(e.target.value) 
	}
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}
	const handleLogin = () => {
		console.log(username, password)
	}

	return (
		<Wrapper>
			<Container>
				<InnerWrapper>
					  <Head>Sign In</Head>
						<InputText value={username} onChange={handleUsernameChange} placeholder="Username" />
						<InputText value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
						<Button onClick={handleLogin} >Login</Button>
				</InnerWrapper>
			</Container>
		</Wrapper>
	)
}


