import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import App from './App'
import theme from './theme'
import { MuiThemeProvider } from '@material-ui/core/styles'

export default class Root extends Component {
    render () {
        const { store, history, socket } = this.props
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <App socket={socket} />
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}
