const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { response } = require("express");
const axios = require("axios");

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent  = (type, data) => {
	if(type === 'PostCreated') {
		const { id, title } = data

		posts[id] = { id, title, comments: [] }
	}

	if(type === 'CommentCreated') {
		const { id, content, postId, status } = data

		const post = posts[postId]

		post.comments.push({ id, content, status })
	}

	if(type === 'CommentUpdated') {
		const {id, postId, content, status} = data

		const post = posts[postId]
		const comment = post.comments.find(comment => comment.id === id)

		comment.status = status
		comment.content = content
	}
}

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/events', (req, res) => {
	const { type, data } = req.body

	handleEvent(type, data)

	res.status(200).send({})
})

app.listen(4002, () => {
	console.log(`Query service listening on port: 4002`)

	axios.get(`http://event-bus-srv:4005/events`).then(response => {
		for(let event of response.data) {
			console.log(`Processing event...: ${event.type}`)

			handleEvent(event.type, event.data)
		}
	})
})