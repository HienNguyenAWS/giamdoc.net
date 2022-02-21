export const PREFIX = '@global'
export const LOGIN = `${PREFIX}/LOGIN`
export const LOGIN_SUCCESS = `${PREFIX}/LOGIN_SUCCESS`
export const LOGIN_SOCIAL = `${PREFIX}/LOGIN_SOCIAL`
export const LOGIN_ERROR = `${PREFIX}/LOGIN_ERROR`
export const RESET_ERROR = `${PREFIX}/RESET_ERROR`
export const LOGOUT = `${PREFIX}/LOGOUT`
export const REGISTER = `${PREFIX}/REGISTER`
export const REGISTER_SUCCESS = `${PREFIX}/REGISTER_SUCCESS`
export const REGISTER_ERROR = `${PREFIX}/REGISTER_ERROR`
export const GET_LIST_LANGUAGE = `${PREFIX}/GET_LIST_LANGUAGE`
export const GET_LIST_LANGUAGE_SUCCESS = `${PREFIX}/GET_LIST_LANGUAGE_SUCCESS`
export const GET_LIST_LANGUAGE_ERROR = `${PREFIX}/GET_LIST_LANGUAGE_ERROR`

export const GET_TYPE_LIST = `${PREFIX}/GET_TYPE_LIST`
export const GET_TYPE_LIST_SUCCESS = `${PREFIX}/GET_TYPE_LIST_SUCCESS`

export const GET_USER = `${PREFIX}/GET_USER`
export const GET_USER_SUCCESS = `${PREFIX}/GET_USER_SUCCESS`
export const GET_USER_ERROR = `${PREFIX}/GET_USER_ERROR`

export const CHANGE_LANGUAGE = `${PREFIX}/CHANGE_LANGUAGE`
export const CHANGE_LANGUAGE_SUCCESS = `${PREFIX}/CHANGE_LANGUAGE_SUCCESS`
export const CHANGE_LANGUAGE_ERROR = `${PREFIX}/CHANGE_LANGUAGE_ERROR`

export const SAVE_USER = `${PREFIX}/SAVE_USER`
export const SAVE_TOKEN = `${PREFIX}/SAVE_TOKEN`
export const UPDATE_USER = `${PREFIX}/UPDATE_USER`

export const GET_GROUP_TYPE = `${PREFIX}/GET_GROUP_TYPE`
export const GET_GROUP_TYPE_SUCCESS = `${PREFIX}/GET_GROUP_TYPE_SUCCESS`

export const EXPAND_COLLAPSE_HEADER = 'EXPAND_COLLAPSE_HEADER'
export const EXPAND_COLLAPSE_SIDE_BAR_LEFT = 'EXPAND_COLLAPSE_SIDE_BAR_LEFT'
export const EXPAND_COLLAPSE_SIDE_BAR_RIGHT = 'EXPAND_COLLAPSE_SIDE_BAR_RIGHT'
export const TOGGLE_HEADER_POST = 'TOGGLE_HEADER_POST'

export const saveUser = (data) => ({
    type: SAVE_USER,
    payload: data
})

export const updateUser = (data) => ({
    type: UPDATE_USER,
    payload: data
})

export const saveToken = (data) => ({
    type: SAVE_TOKEN,
    payload: data
})

export const getUser = () => ({
    type: GET_USER
})

export const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    payload: data
})

export const getUserError = (data) => ({
    type: GET_USER_ERROR,
    payload: data
})

// -------------------------------------------
export const login = (data) => ({
    type: LOGIN,
    payload: data
})

export const loginSocial = (data) => ({
    type: LOGIN_SOCIAL,
    payload: data
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginError = (data) => ({
    type: LOGIN_ERROR,
    payload: data
})

export const resetError = () => ({
    type: RESET_ERROR
})

export const logout = () => ({
    type: LOGOUT
})

export const register = (data) => ({
    type: REGISTER,
    payload: data
})

export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
})

export const registerError = (data) => ({
    type: REGISTER_ERROR,
    payload: data
})

export const changeLanguage = (data) => ({
    type: CHANGE_LANGUAGE,
    payload: data
})

export const changeLanguageSuccess = (data) => ({
    type: CHANGE_LANGUAGE_SUCCESS,
    payload: data
})

export const changeLanguageError = (data) => ({
    type: CHANGE_LANGUAGE_ERROR,
    payload: data
})

export const getListLanguage = (data) => ({
    type: GET_LIST_LANGUAGE,
    payload: data
})

export const getListLanguageSuccess = (data) => ({
    type: GET_LIST_LANGUAGE_SUCCESS,
    payload: data
})

export const getListLanguageError = (data) => ({
    type: GET_LIST_LANGUAGE_ERROR,
    payload: data
})

export const getGroupTypeAction = (langId) => ({
    type: GET_GROUP_TYPE,
    payload: langId
})

export const getGroupTypeActionSuccess = (data) => ({
    type: GET_GROUP_TYPE_SUCCESS,
    payload: data
})

export const setTypeList = (data) => ({
    type: GET_TYPE_LIST,
    payload: data
})

export const setExpandCollapseHeader = (data) => ({
    type: EXPAND_COLLAPSE_HEADER,
    payload: data
})

export const setExpandCollapseSideBarLeft = (data) => ({
    type: EXPAND_COLLAPSE_SIDE_BAR_LEFT,
    payload: data
})

export const setExpandCollapseSideBarRight = (data) => ({
    type: EXPAND_COLLAPSE_SIDE_BAR_RIGHT,
    payload: data
})

export const toggleHeaderPostAction = () => ({
    type: TOGGLE_HEADER_POST
})
