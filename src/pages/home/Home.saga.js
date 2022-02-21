import { takeLatest, call, put } from 'redux-saga/effects'
import {
    GET_LIST_COMPANY,
    CREATE_COMPANY,
    getListCompanySuccess,
    getListCompanyError,
    createCompanySuccess,
    createCompanyError
} from './Home.action'
import API from '../../services/api'
import errors from '../../constants/error'

function* getCompanySaga() {
    try {
    // call api
        const response = yield call(API.company.listCompany)
        yield put(getListCompanySuccess(response?.data || []))
    } catch (e) {
        yield put(getListCompanyError(e.message))
    }
}

function* createCompanySaga(data) {
    try {
    // call api
        const response = yield call(API.company.createCompany, data)
        if (response?.message === 'DUPLICATE_SLUG') {
            yield put(createCompanyError(errors[response.message]))
        } else {
            if (response?.code === 200) {
                yield put(createCompanySuccess(response.data))
            }
        }
    } catch (e) {
        yield put(createCompanyError(e.message))
    }
}

export default function* companySaga() {
    yield takeLatest(GET_LIST_COMPANY, getCompanySaga)
    yield takeLatest(CREATE_COMPANY, createCompanySaga)
}
