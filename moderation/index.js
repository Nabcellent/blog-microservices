const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/events', async(req, res) => {
	const { type, data } = req.body

	if(type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		await axios.post(`http://localhost:4005`, {
			type: 'CommentModerated',
			data: {
				...data,
				status
			}
		})
	}

	res.status(200).send({})
})

app.listen(4003, () => console.log(`App listening on port: 4003`))