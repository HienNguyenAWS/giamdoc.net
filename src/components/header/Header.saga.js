import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_USER, getUserSuccess, getUserError } from './Header.action'
import API from '../../services/api'

// Example Code
function* getUserSaga({ id }) {
    try {
    // call api
        const response = yield call(API.user.getUser, id)
        yield put(getUserSuccess(response))
    } catch (e) {
        yield put(getUserError(e.message))
    }
}

export default function* agentSaga() {
    yield takeLatest(GET_USER, getUserSaga)
}
