import { fromJS } from 'immutable'
import {
    clearToken,
    getProfile,
    getToken,
    setProfile,
    setToken,
    setRefreshToken,
    getRefreshToken,
    getLanguage,
    setLanguage,
    getLanguageId
} from '../../services/storages/userStorage'
import baseApi from '../../services/api/base.api'

import {
    SAVE_TOKEN,
    SAVE_USER,
    UPDATE_USER,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    RESET_ERROR,
    LOGOUT,
    LOGIN_SOCIAL,
    REGISTER,
    REGISTER_ERROR,
    GET_LIST_LANGUAGE,
    CHANGE_LANGUAGE,
    GET_LIST_LANGUAGE_SUCCESS,
    GET_LIST_LANGUAGE_ERROR,
    CHANGE_LANGUAGE_ERROR,
    CHANGE_LANGUAGE_SUCCESS,
    GET_GROUP_TYPE_SUCCESS,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    GET_TYPE_LIST,
    EXPAND_COLLAPSE_HEADER,
    EXPAND_COLLAPSE_SIDE_BAR_LEFT,
    EXPAND_COLLAPSE_SIDE_BAR_RIGHT,
    TOGGLE_HEADER_POST
} from './global.action'

const initialState = fromJS({
    user: getProfile(),
    userToken: getToken(),
    refreshToken: getRefreshToken(),
    error: null,
    loading: false,
    loadingFacebook: false,
    loadingGoogle: false,
    lang: getLanguage() ? getLanguage() : 'vi',
    listLang: [],
    typeList: '',
    expandCollapse: true,
    expandCollapseLeft: true,
    expandCollapseRight: false,
    isHeaderPost: true
})

baseApi.setToken(getToken())
baseApi.setClearCallback(clearToken)

const reducer = (state = initialState, action) => {
    let user, newUser, token, langs, temp
    let langId, lang, tempLang
    switch (action.type) {
    case SAVE_USER:
        user = state.get('user', {})
        newUser = { ...user, ...action.payload }
        setProfile(newUser)
        return state.set('user', newUser)

    case UPDATE_USER:
        user = state.get('user', {})
        newUser = { ...user, ...action.payload }
        setProfile(newUser)
        return state.set('user', newUser)

    case SAVE_TOKEN:
        token = action.payload
        baseApi.setToken(token)
        baseApi.setClearCallback(clearToken)
        console.log('SAVEEEEEEEEEEEEEEEEEEEE', token)
        setToken(token)
        return state.set('userToken', token)

    case LOGIN:
        return state.set('loading', true)
    case LOGIN_SOCIAL:
        return state
            .set('loadingFacebook', action.payload.type === 2)
            .set('loadingGoogle', action.payload.type === 1)
    case LOGIN_ERROR:
        return state
            .set('error', action.payload)
            .set('loading', false)
            .set('loadingFacebook', false)
            .set('loadingGoogle', false)
    case LOGIN_SUCCESS:
        user = state.get('user', {})
        newUser = { ...user, ...action.payload.data }
        setProfile(newUser)

        token = action.payload.token
        baseApi.setToken(token)
        baseApi.setClearCallback(clearToken)
        console.log('LOGIN SUCCESSSSSSSSSSSSSSSSSSS', token)
        setToken(token)
        setRefreshToken(action.payload.refreshToken || '')
        return state
            .set('user', action.payload.data)
            .set('userToken', action.payload.token)
            .set('refreshToken', action.payload.refreshToken)
            .set('error', null)
            .set('loading', false)
            .set('loadingFacebook', false)
            .set('loadingGoogle', false)

    case RESET_ERROR:
        return state
            .set('error', null)
            .set('loading', false)
            .set('loadingFacebook', false)
            .set('loadingGoogle', false)

    case LOGOUT:
        clearToken()
        return state
            .set('user', null)
            .set('userToken', null)
            .set('refreshToken', null)
            .set('error', null)
            .set('loading', false)
    case REGISTER:
        return state.set('loading', true)
    case REGISTER_ERROR:
        return state.set('error', action.payload).set('loading', false)

    case GET_LIST_LANGUAGE:
    case CHANGE_LANGUAGE:
        return state.set('loading', true)

    case GET_LIST_LANGUAGE_SUCCESS:
        langId = getLanguageId()
        lang = action.payload.find((item) => item.Id === langId)
        tempLang = state.get('lang', 'vi')

        if (lang && tempLang !== lang.Code) {
            setLanguage(lang.Code)
            return state
                .set('lang', lang.Code)
                .set('listLang', action.payload)
                .set('error', null)
                .set('loading', false)
        }
        return state
            .set('lang', 'vi')
            .set('listLang', action.payload)
            .set('error', null)
            .set('loading', false)

    case CHANGE_LANGUAGE_SUCCESS:
        langs = state.get('listLang', [])
        temp = langs.find((item) => item.Id === action.payload)

        user = state.get('user', {})
        user = user.toJS ? user.toJS() : user
        newUser = { ...user, ...action.payload, LanguageId: action.payload }
        setProfile(newUser)

        if (temp) {
            setLanguage(temp.Code)
        }

        return state
            .set('user', newUser)
            .set('lang', temp ? temp.Code : 'vi')
            .set('error', null)
            .set('loading', false)

    case GET_LIST_LANGUAGE_ERROR:
    case CHANGE_LANGUAGE_ERROR:
        return state.set('error', action.payload).set('loading', false)
    case GET_GROUP_TYPE_SUCCESS:
        return state.set('groupType', action.payload)
    case GET_USER_SUCCESS:
        user = state.get('user', {})
        newUser = { ...user, ...action.payload }
        setProfile(newUser)
        return state.set('user', newUser)
    case GET_USER_ERROR:
        return state.set('error', action.payload).set('loading', false)
    case GET_TYPE_LIST:
        return state.set('typeList', action.payload)
    case EXPAND_COLLAPSE_HEADER:
        return state.set('expandCollapse', action.payload)
    case EXPAND_COLLAPSE_SIDE_BAR_LEFT:
        return state.set('expandCollapseLeft', action.payload)
    case EXPAND_COLLAPSE_SIDE_BAR_RIGHT:
        return state.set('expandCollapseRight', action.payload)
    case TOGGLE_HEADER_POST:
        return state.set('isHeaderPost', !state.get('isHeaderPost'))
    default:
        return state
    }
}

export default reducer
