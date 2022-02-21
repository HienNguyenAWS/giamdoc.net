import { takeLatest, call, put } from 'redux-saga/effects'
import API from '../../services/api'
import {
    changeAvatarSuccess,
    changeCoverSuccess,
    changePasswordSuccess,
    getUserImagesByIdSuccess,
    getProfileUserImagesByIdSuccess,
    updateProfileError,
    updateProfileSuccess
} from './UserProfile.action'
import {
    CHANGE_AVATAR,
    CHANGE_COVER,
    CHANGE_PASSWORD,
    GET_USER_IMAGES_BY_ID,
    GET_PROFILE_USER_IMAGES_BY_ID,
    UPDATE_PROFILE
} from './UserProfile.constant'

const createFormData = (image) => {
    const formData = new FormData()
    formData.append('files', image)
    return formData
}

function* updateProfileSaga({ payload }) {
    try {
        let newUserProfile = {}
        let avatarRes = {}
        let coverImgRes = {}
        console.log('SAO K AI LAM UPDATE PROFILE HET V', payload)
        if (payload.avatar) {
            avatarRes = yield call(
                API.uploadFile.uploadFile,
                createFormData(payload.avatar),
                'image'
            )
            yield call(API.user.changeAvatar, { avatar: avatarRes.imageId })
            yield call(API.user.saveUserImage, {
                code: avatarRes.imageId,
                type: 1,
                name: payload.avatar.name
            })
            newUserProfile.Avatar = avatarRes.imageId
        }
        if (payload.coverImg) {
            coverImgRes = yield call(
                API.uploadFile.uploadFile,
                createFormData(payload.coverImg),
                'image'
            )
            yield call(API.user.changeCover, { cover: coverImgRes.imageId })
            yield call(API.user.saveUserImage, {
                code: coverImgRes.imageId,
                type: 1,
                name: payload.coverImg.name
            })
            newUserProfile.ImgCover = coverImgRes.imageId
        }
        const dataReq = JSON.parse(JSON.stringify(payload))
        delete dataReq.avatar
        delete dataReq.coverImg
        const response = yield call(API.user.updateProfile, dataReq)
        newUserProfile = {
            ...newUserProfile,
            ...JSON.parse(JSON.stringify(response.data))
        }
        yield put(updateProfileSuccess(newUserProfile))
    } catch (e) {
        console.log(e)
        yield put(updateProfileError(e.message))
    }
}

function* changePasswordSaga(data) {
    try {
        yield call(API.user.resetUserPassword, data.payload)
        yield put(changePasswordSuccess())
    } catch (error) {
        console.log(error)
    }
}

function* getUserImagesSaga(data) {
    try {
        const res = yield call(API.user.getImageByUserId, data.payload)
        yield put(getUserImagesByIdSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}

function* getProfileUserImagesSaga(data) {
    try {
        const res = yield call(API.user.getImageByUserId, data.payload)
        yield put(getProfileUserImagesByIdSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}

function* changeAvatarSaga(data) {
    try {
        const res = yield call(
            API.uploadFile.uploadFile,
            createFormData(data.payload),
            'image'
        )
        yield call(API.user.changeAvatar, {
            avatar: res.imageId
        })
        yield put(changeAvatarSuccess(res.imageId))
        yield call(API.user.saveUserImage, {
            code: res.imageId,
            type: 1,
            name: data.payload.name
        })
    } catch (error) {console.log(error)}
}
function* changeCoverSaga(data) {
    console.log('??????')
    try {
        const res = yield call(
            API.uploadFile.uploadFile,
            createFormData(data.payload),
            'image'
        )
        yield call(API.user.changeCover, {
            cover: res.imageId
        })
        yield put(changeCoverSuccess(res.imageId))

    } catch (error) {console.log(error)}
}

export default function* updateProfileWathcer() {
    yield takeLatest(UPDATE_PROFILE, updateProfileSaga)
    yield takeLatest(CHANGE_PASSWORD, changePasswordSaga)
    yield takeLatest(GET_USER_IMAGES_BY_ID, getUserImagesSaga)
    yield takeLatest(GET_PROFILE_USER_IMAGES_BY_ID, getProfileUserImagesSaga)
    yield takeLatest(CHANGE_AVATAR, changeAvatarSaga)
    yield takeLatest(CHANGE_COVER, changeCoverSaga)
}
