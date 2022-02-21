import {
    UPDATE_PROFILE,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS,
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    GET_USER_IMAGES_BY_ID,
    GET_USER_IMAGES_BY_ID_SUCCESS,
    GET_PROFILE_USER_IMAGES_BY_ID,
    GET_PROFILE_USER_IMAGES_BY_ID_SUCCESS,
    CHANGE_AVATAR,
    CHANGE_AVATAR_SUCCESS,
    CHANGE_COVER,
    CHANGE_COVER_SUCCESS,
    CLEAR_IMAGES,
    CLEAR_PROFILE_IMAGES
} from './UserProfile.constant'

export const updateProfile = data => ({
    type: UPDATE_PROFILE,
    payload: data
})

export const updateProfileSuccess = data => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: data
})

export const updateProfileError = error => ({
    type: UPDATE_PROFILE_ERROR,
    payload: error
})

export const getUserProfile = () => {
    return {
        type: GET_USER_PROFILE
    }
}

export const getUserProfileSuccess = data => ({
    type: GET_USER_PROFILE_SUCCESS,
    payload: data
})

export const changePassword = data => {
    return {
        type: CHANGE_PASSWORD,
        payload: data
    }
}

export const changePasswordSuccess = data => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data
})

export const getUserImagesById = payload => {
    return {
        type: GET_USER_IMAGES_BY_ID,
        payload
    }
}

export const getUserImagesByIdSuccess = payload => ({
    type: GET_USER_IMAGES_BY_ID_SUCCESS,
    payload
})

export const getProfileUserImagesById = payload => {
    return {
        type: GET_PROFILE_USER_IMAGES_BY_ID,
        payload
    }
}

export const getProfileUserImagesByIdSuccess = payload => ({
    type: GET_PROFILE_USER_IMAGES_BY_ID_SUCCESS,
    payload
})

export const changeAvatar = payload => ({
    type: CHANGE_AVATAR,
    payload
})

export const changeAvatarSuccess = payload => ({
    type: CHANGE_AVATAR_SUCCESS,
    payload
})

export const changeCover = payload => ({
    type: CHANGE_COVER,
    payload
})

export const changeCoverSuccess = payload => ({
    type: CHANGE_COVER_SUCCESS,
    payload
})

export const clearImage = () => ({
    type: CLEAR_IMAGES
})

export const clearProfileImage = () => ({
    type: CLEAR_PROFILE_IMAGES
})
