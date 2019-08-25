// const react = requied('react')

import React from 'react'

const Toolbar = (props) => {
	return (
		<nav>this is toolbar [page: {props.title || ''}]</nav>
	)
}

export default Toolbar