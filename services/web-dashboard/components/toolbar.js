import React, { useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import Login from './login'
import { onLogout, onJwtReceived } from './../store'


const Navigation = styled.nav`
	background-color: #1f82a1;
	padding: 10px;
	color: white;
`

const Container = styled.div`
	width: 1300px;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
`

const Fullscreen = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	background-color: rgba(90, 90, 90, 0.7);
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Toolbar = (props) => {

	if (!props.jwt) {
		const info = Cookies.get('jwt')
		if (info) {
			props.restore(JSON.parse(info))
		}
	}

	const [showLoginModal, setShowLoginModal] = useState(false)

	if (showLoginModal && props.jwt) {
		setShowLoginModal(false)
	}

	const renderMemberComp = () => {
		return (
			<div>
				{ 
					props.jwt 
					? <div>`Hello: ${props.user.alias}`<button onClick={props.logout}>logout</button></div>
					: <button onClick={() => setShowLoginModal(true)}>login</button> 
				}
			</div>
		)
	}

	return (
		<Navigation>
			<Container>
				<div>this is toolbar [page: {props.title || ''}]</div>
				{ renderMemberComp() }
			</Container>
			{ 
				showLoginModal 
				? <Fullscreen><Login /></Fullscreen>  
				: null
			}
		</Navigation>
	)
}

const mapStateToProps = (state) => {
	return {
		jwt: state.jwt,
		user: state.user
	}
}

const mapActionToProps = {
	logout: onLogout,
	restore: onJwtReceived
}

export default connect(mapStateToProps, mapActionToProps)(Toolbar)