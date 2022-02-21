import {
    GET_USER_PROFILE,
    GET_USER_PROFILE_ERROR,
    GET_USER_PROFILE_SUCCESS
} from './HeaderMain.constant'

// eslint-disable-next-line no-unused-vars
const path = 'components/Header/'

// export const GET_USER = `${path}GET_USER`;
// export const GET_USER_SUCCESS = `${path}GET_USER_SUCCESS`;
// export const GET_USER_ERROR = `${path}GET_USER_ERROR`;

export const getUserProfile = () => {
    return {
        type: GET_USER_PROFILE
    }
}

export const getUserProfileSuccess = (data) => ({
    type: GET_USER_PROFILE_SUCCESS,
    payload: data
})

export const getUserProfileError = (error) => ({
    type: GET_USER_PROFILE_ERROR,
    payload: error
})
