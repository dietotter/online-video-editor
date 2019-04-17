import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoEditor from './VideoEditor.view'
import { actions } from './VideoEditor.state'
import { push } from 'connected-react-router'

export default connect(
    state => ({
        testContainerState: state.testContainerState,
        location: state.router.location
    }),
    dispatch => ({
        testActions: bindActionCreators(actions, dispatch),
        push: bindActionCreators(push, dispatch)
    })
)(VideoEditor)
