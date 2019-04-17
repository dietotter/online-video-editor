import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'
import routes from './routes'
import socket from './socket'

const app = express()
app.server = http.createServer(app)

// configure logger
app.use(morgan('dev'))

// configure body-parser
app.use(bodyParser.json())
// ? will be needed if i'll be using http-requests, not sockets
// app.use(bodyParser.urlencoded({ extended: false }))

// use cors
app.use(cors())

// add endpoints
routes(app)

// launch server on port
const { port } = config
app.server.listen(port, () => {
    socket(app.server)
    console.log('Fml on', port)
})

export default app
