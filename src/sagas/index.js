import { all } from 'redux-saga/effects'
import headerSaga from '../components/header/Header.saga'
import globalSaga from '../stores/global/global.saga'
import homeSaga from '../pages/home/Home.saga'
import getUserProfileWathcer from '../components/header-main/HeaderMain.saga'
import userProfileSaga from '../pages/user-profile/UserProfile.saga'

export default function* rootSaga() {
    yield all([
        headerSaga(),
        globalSaga(),
        homeSaga(),
        getUserProfileWathcer(),
        userProfileSaga()
    ])
}
