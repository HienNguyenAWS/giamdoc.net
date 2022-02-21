const path = 'components/Header/'

export const LOGIN_START = `${path}LOGIN_START`
export const LOGIN_SUCCESS = `${path}LOGIN_SUCCESS`
export const LOGIN_ERROR = `${path}LOGIN_ERROR`

export const GET_USER = `${path}GET_USER`
export const GET_USER_SUCCESS = `${path}GET_USER_SUCCESS`
export const GET_USER_ERROR = `${path}GET_USER_ERROR`

// Example Code
export const startLogin = () => ({
    type: LOGIN_START
})
export const loginSuccess = (agentInfo) => ({
    type: LOGIN_SUCCESS,
    payload: agentInfo
})
export const loginError = () => ({
    type: LOGIN_ERROR
})

// export const getUser = (id) => ({
//   type: GET_USER,
//   id
// });

export const getUser = (id) => ({
    type: GET_USER,
    id
})

export const getUserSuccess = (agentInfo) => ({
    type: GET_USER_SUCCESS,
    payload: agentInfo
})

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error
})
