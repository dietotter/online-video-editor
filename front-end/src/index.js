import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore, { history } from './js/store/configureStore'
import Root from './js/root'

import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import ls from './js/utils/ls'
import config from './js/config'

const token = ls.get('token')

let socket = io(config.apiServerAddress, {
    query: {
        token
    },
    transports: ['websocket']
})

socket.on('token', token => ls.save('token', token))

let socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/')

const store = configureStore(socketIoMiddleware)
const app = document.getElementById('app')

ReactDOM.render(
    <AppContainer>
        <Root store={store} history={history} socket={socket} />
    </AppContainer>, app)

console.log('smth')

if (module.hot) {
    module.hot.accept('./js/root', () => {
        const NewRoot = require('./js/root').default
        ReactDOM.render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('app')
        )
    })
}

// TODO
//
// Implement react-player on front (maybe use video-react instead)
// Css-loader
