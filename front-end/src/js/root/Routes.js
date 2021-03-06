import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import TestContainer from '../components/TestContainer/'
import VideoEditor from '../components/VideoEditor/'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Routes extends Component {
    shouldComponentUpdate (nextProps) {
        const {
            location: { pathname: nextPathName }
        } = nextProps
        const { location: { pathname } } = this.props
        /* returns true only when pathname change happen (we move to another page) or signIn state changes */
        return pathname !== nextPathName
    }

    render () {
        const { socket } = this.props
        return (
            <Switch>
                <Route exact path='/' component={TestContainer} />
                <Route path='/editor' render={props => <VideoEditor socket={socket} {...props}/>}/>
                {/*<Route path='/user/:userId' component={UserDetails} />*/}
                {/*<Route component={NotFoundPage} />*/}
            </Switch>
        )
    }
}

export default withRouter(
    connect(
        state => ({
            router: state.router
        }),
        dispatch => ({
            push: bindActionCreators(push, dispatch)
        })
    )(Routes)
)
