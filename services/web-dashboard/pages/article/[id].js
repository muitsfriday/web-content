import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/toolbar'

const Article = () => {

	const router = useRouter()
	const { id } = router.query

	return (
		<>
			<Toolbar title="article page" />
			<div>article page id = {id}</div>
		</>
	)
}

export default Article