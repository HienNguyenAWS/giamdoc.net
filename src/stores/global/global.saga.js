import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LOGIN,
    LOGIN_SOCIAL,
    REGISTER,
    CHANGE_LANGUAGE,
    GET_LIST_LANGUAGE,
    loginSuccess,
    loginError,
    registerError,
    login,
    changeLanguageSuccess,
    changeLanguageError,
    getListLanguageSuccess,
    getListLanguageError,
    GET_GROUP_TYPE,
    getGroupTypeActionSuccess,
    GET_USER,
    getUserSuccess,
    getUserError
} from './global.action'
import API from '../../services/api'
import errors from '../../constants/error'
import { PROCESS_SUCCESS } from '../../constants/strings'

function* loginSaga({ payload }) {
    try {
    // call api
        const response = yield call(API.user.login, payload)
        console.log('response', response)

        if (response?.data.code !== 200) {
            yield put(loginError(errors[response.data.message]))
        } else {
            console.log('response', response)
            yield put(
                loginSuccess({
                    data: response?.data.userInfo,
                    token: response?.data?.data || '',
                    refreshToken: response?.data?.refreshToken || ''
                })
            )
        }
    } catch (e) {
        yield put(loginError(errors[e]))
    }
}

function* loginSocialSaga({ payload }) {
    try {
    // call api
        const { token, type, profileObj } = payload
        const response = yield call(API.user.loginSocical, {
            token,
            profileObj,
            type
        })
        yield put(
            loginSuccess({
                data: response?.data,
                token: response?.data?.token || '',
                refreshToken: response?.data?.refreshToken || ''
            })
        )
    } catch (e) {
        yield put(loginError(e))
    }
}

function* registerSaga({ payload }) {
    try {
        const response = yield call(API.user.register, payload)
        if (response?.code === 200) {
            yield put(
                login({
                    userName: payload?.userName || '',
                    passWord: payload?.passWord || '',
                    type: 3
                })
            )
        } else {
            yield put(registerError(errors[response.message]))
        }
    } catch (e) {
        yield put(registerError(e))
    }
}

function* getListLanguageSaga({ payload }) {
    try {
    // call api
        const response = yield call(API.language.getListLanguage, payload)
        yield put(getListLanguageSuccess(response?.data || []))
    } catch (e) {
        yield put(getListLanguageError(e))
    }
}

function* changeLanguageSaga({ payload }) {
    try {
    // call api
        const response = yield call(API.language.changeLanguage, {
            languageId: payload.Id
        })
        if (response?.code === 200 && response?.message === PROCESS_SUCCESS) {
            yield put(changeLanguageSuccess(payload.Id))
        }
    } catch (e) {
        yield put(changeLanguageError(e))
    }
}

function* getGroupTypeSaga({ payload }) {
    try {
    // call api
        const response = yield call(API.group.getGroupType, payload)
        if (response?.code === 200 && response?.message === PROCESS_SUCCESS) {
            yield put(getGroupTypeActionSuccess(response.data))
        }
    } catch (e) {
        console.log(e)
    }
}

function* getUserSaga() {
    try {
    // call api
        const response = yield call(API.user.getUserOutside)
        if (response?.code === 200 && response?.message === PROCESS_SUCCESS) {
            yield put(getUserSuccess(response?.data))
        }
    } catch (e) {
        // eslint-disable-next-line no-undef
        yield put(getUserError(response?.data))
    }
}

export default function* agentSaga() {
    yield takeLatest(LOGIN, loginSaga)
    yield takeLatest(LOGIN_SOCIAL, loginSocialSaga)
    yield takeLatest(REGISTER, registerSaga)
    yield takeLatest(GET_LIST_LANGUAGE, getListLanguageSaga)
    yield takeLatest(CHANGE_LANGUAGE, changeLanguageSaga)
    yield takeLatest(GET_GROUP_TYPE, getGroupTypeSaga)
    yield takeLatest(GET_USER, getUserSaga)
}
