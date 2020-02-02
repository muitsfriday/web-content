import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const getFormatTime = (dateString) => {
	const date = new Date(dateString)
	const defaultDate = new Date("2019-12-01")

	return moment(date.toString() === 'Invalid Date' ? defaultDate : date).format("Do MMMM YYYY, hh:mm A")
}

const getTimeFromNow = (dateString) => {
	const date = new Date(dateString)
	const defaultDate = new Date("2019-12-01")

	return moment(date.toString() === 'Invalid Date' ? defaultDate : date).fromNow()
}

const ArticleCard = ({ data = {} }) => (
	<div>
		<h3>{data.title || ''}</h3>
		<span>Created At: <span>{getFormatTime(data.createAt)} ({getTimeFromNow(data.createAt)})</span></span>
	</div>
)

export default ArticleCard