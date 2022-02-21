import baseApi from '../base.api'
import HttpAuthClient from '../auth.api'
import { paths } from '../paths'

export const login = (data) => {
    return HttpAuthClient.post(paths.login(), data)
}

export const loginSocical = (data) => {
    return baseApi.post(paths.loginSocical(), data)
}

export const register = (data) => {
    return baseApi.post(paths.register(), data)
}

export const resetPass = (data) => {
    return baseApi.post(paths.resetPass(), data)
}

export const sendEmailResetPass = (data) => {
    return baseApi.post(paths.forgotPass(), data)
}
//handle account
export const getUserOutside = () => {
    return baseApi.get(paths.getUserOutside())
}

export const getUserProfile = () => {
    return baseApi.get(paths.getUserProfile())
}
export const updateProfile = (data) => {
    return baseApi.put(paths.updateProfile(), data)
}
export const updateStatus = (data) => {
    return baseApi.post(paths.updateStatus(), data)
}
export const resetUserPassword = (data) => {
    return baseApi.post(paths.resetUserPassword(), data)
}
export const updateInfor = (data) => {
    return baseApi.put(paths.updateInfor(), data)
}
export const updateJob = (data) => {
    return baseApi.put(paths.updateJob(), data)
}
export const changeAvatar = (data) => {
    return baseApi.put(paths.changeAvatar(), data)
}
export const changeCover = (data) => {
    return baseApi.put(paths.changeCover(), data)
}
export const getImageByUserId = (data) => {
    return baseApi.get(paths.getImageByUserId(data))
}

export const saveUserImage = (data) => {
    return baseApi.post(paths.saveUserImage(), data)
}
