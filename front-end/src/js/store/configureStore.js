import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import ls from '../utils/ls'
import config from '../config'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../redux'
export const history = createBrowserHistory()

const token = ls.get('token')

export let socket = io(config.apiServerAddress, {
  query: {
    token
  },
  transports: ['websocket']
})

socket.on('token', token => ls.save('token', token))

let socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/')

function configureStoreDev (initialState) {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // Add other middleware on this line...
    socketIoMiddleware,

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    logger,
    reactRouterMiddleware
  ]

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux', () => {
      const nextReducer = require('../redux').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const configureStore = configureStoreDev

export default configureStore
