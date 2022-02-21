import { takeLatest, call, put } from 'redux-saga/effects'
import API from '../../services/api'
import {
    getUserProfileError,
    getUserProfileSuccess
} from './HeaderMain.action'
import { saveUser } from '../../stores/global/global.action'
import { GET_USER_PROFILE } from './HeaderMain.constant'

function* getUserProfileSaga() {
    try {
        const response = yield call(API.user.getUserProfile)
        yield put(getUserProfileSuccess(response.data))
        yield put(saveUser(response.data))
    } catch (e) {
        yield put(getUserProfileError(e.message))
    }
}

export default function* getUserProfileWathcer() {
    yield takeLatest(GET_USER_PROFILE, getUserProfileSaga)
}
