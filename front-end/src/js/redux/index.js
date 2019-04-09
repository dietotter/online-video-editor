import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { testContainerState } from '../components/TestContainer'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    testContainerState,
})

export default rootReducer
