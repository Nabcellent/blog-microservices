const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.listen('port', () => console.log(`App listening on port: `))