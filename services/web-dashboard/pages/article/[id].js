import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/toolbar'


/**
 * const a = { id: 'sdasca', name: 'jake' }
 * const id = a.id
 * const name = a.name
 * 
 * const { id, name, surname = 'not provide' } = a
 * 
 */

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