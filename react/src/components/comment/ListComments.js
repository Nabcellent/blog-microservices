import React from "react";

const ListComments = ({ comments }) => {
	const renderedComments = Object.values(comments).map(comment => {
		let { content } = comment;

		if(comment.status === 'approved') {
			content = comment.content
		} else if(comment.status === 'pending') {
			content = <span className={'text-secondary'}>Awaiting moderation...</span>
		} else if(comment.status === 'rejected') {
			content = <i className={'text-danger'}>Comment rejected!</i>
		}

		return <li key={comment.id}>--- {content}</li>
	})

	return <ul>{renderedComments}</ul>
}

export default ListComments