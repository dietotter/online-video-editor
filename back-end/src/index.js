import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'

const app = express()

// configure logger
app.use(morgan('dev'))

// configure body-parser
app.use(bodyParser.json())
// ? will be needed if i'll be using http-requests, not sockets
// app.use(bodyParser.urlencoded({ extended: false }))

// use cors
app.use(cors())

// launch server on port
const { port } = config
app.listen(port, () => {
    console.log('Fml on', port)
})

export default app
