import createReducer from '../../utils/createReducer'
import {
    TEST_ACTION, TEST_ACTION_PAYLOAD, CONNECTION_RESPONSE, TEST_CONNECTION
} from '../../redux/actionTypes'

// ======================= INITIAL STATE =======================
export const VideoEditorState = {
    counter: 0,
    serverMsg: ''
}

// ======================= ACTIONS =======================
const testAction = () => ({
    type: TEST_ACTION
})

const testActionWithPayload = payload => ({
    type: TEST_ACTION_PAYLOAD,
    payload
})

const testConnection = ({ message }) => ({
    type: TEST_CONNECTION,
    payload: { message }
})

// ======================= REDUCER =======================
export const videoEditorReducer = {
    [TEST_ACTION]: (state) => ({
        ...state,
        counter: state.counter + 1
    }),
    [TEST_ACTION_PAYLOAD]: (state, payload) => ({
        ...state,
        ...payload
    }),
    [CONNECTION_RESPONSE]: (state, payload) => ({
        ...state,
        serverMsg: payload.message
    })
}

// ======================= REDUCER AND ACTIONS EXPORTS =======================
export const videoEditorState = createReducer(
    videoEditorReducer,
    VideoEditorState
)

export const actions = {
    testAction,
    testActionWithPayload,
    testConnection
}
