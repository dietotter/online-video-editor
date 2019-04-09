import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore, { history } from './js/store/configureStore'
import Root from './js/root'

const store = configureStore()
const app = document.getElementById('app')

ReactDOM.render(
    <AppContainer>
        <Root store={store} history={history} />
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
// Implement react-player on front (maybe use video-react)
// Css-loader
// Implement socket connection between back and front
