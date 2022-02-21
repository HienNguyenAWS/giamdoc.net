import { fromJS } from 'immutable'

import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    LOGIN_SUCCESS
} from './Header.action'

const initialState = fromJS({
    token: null,
    user: null,
    loading: false,
    error: null
})

// Example Code
const reducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: true,
            token: action.payload.token,
            user: action.payload.user
        }
    case GET_USER:
        return {
            ...state,
            loading: true
        }
    case GET_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            loading: false
        }
    case GET_USER_ERROR:
        return {
            ...state,
            user: null,
            error: action.payload,
            loading: false
        }
    default:
        return state
    }
}

export default reducer
