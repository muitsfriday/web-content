import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
	margin: 0 auto;
	max-width: 720px;
`

const Layout = (props) => (
	<Container>{props.children}</Container>
)

export default Layout