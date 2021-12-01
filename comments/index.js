const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require("axios");
const { param } = require("express/lib/router");

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async(req, res) => {
	const { content } = req.body
	const commentId = randomBytes(4).toString('hex')

	const comments = commentsByPostId[req.params.id] || []

	comments.push({ id: commentId, content, status: 'pending' })

	commentsByPostId[req.params.id] = comments

	await axios.post(`http://localhost:4005/events`, {
		type: 'CommentCreated',
		data: {
			id: commentId,
			postId: req.params.id,
			content,
			status: 'pending'
		}
	})

	res.status(201).send(comments)
})

app.post('/events', async(req, res) => {
	console.log(`Received event: `, req.body.type)

	const { type, data } = req.body

	if(type === 'CommentModerated') {
		const { id, postId, status, content } = data

		const comments = commentsByPostId[postId]
		const comment = comments.find(comment => comment.id === id)

		comment.status = status

		await axios.post(`https://localhost:4005`, {
			type: 'CommentUpdated', data: { id, postId, status, content }
		})
	}

	res.status(200).send({})
})

app.listen(4001, () => console.log('Listening on port 4001'))