import createReducer from '../../utils/createReducer'
import {
    TEST_ACTION, TEST_ACTION_PAYLOAD
} from '../../redux/actionTypes'

// ======================= INITIAL STATE =======================
export const TestContainerState = {
    counter: 0
}

// ======================= ACTIONS =======================
const testAction = () => ({
    type: TEST_ACTION
})

const testActionWithPayload = payload => ({
    type: TEST_ACTION_PAYLOAD,
    payload
})

// ======================= REDUCER =======================
export const testContainerReducer = {
    [TEST_ACTION]: (state) => ({
        ...state,
        counter: state.counter + 1
    }),
    [TEST_ACTION_PAYLOAD]: (state, payload) => ({
        ...state,
        ...payload
    })
}

// ======================= REDUCER AND ACTIONS EXPORTS =======================
export const testContainerState = createReducer(
    testContainerReducer,
    TestContainerState
)

export const actions = {
    testAction,
    testActionWithPayload
}
