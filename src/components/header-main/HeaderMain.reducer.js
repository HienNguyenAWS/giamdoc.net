import { fromJS } from 'immutable'
import {
    GET_USER_PROFILE,
    GET_USER_PROFILE_ERROR,
    GET_USER_PROFILE_SUCCESS
} from './HeaderMain.constant'

const initialState = fromJS({
    loading: false,
    userProfile: {},
    error: null
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_USER_PROFILE:
        return state.set('loading', true)
    case GET_USER_PROFILE_SUCCESS:
        return state.set('loading', false).set('userProfile', action.payload)
    case GET_USER_PROFILE_ERROR:
        return state.set('loading', false).set('error', action.payload)
    default:
        return state
    }
}
export default reducer
