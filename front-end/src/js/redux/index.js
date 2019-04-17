import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { testContainerState } from '../components/TestContainer'
import { videoEditorState } from '../components/VideoEditor'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    testContainerState,
    videoEditorState,
})

export default rootReducer
