import baseApi from '../base.api'
import { paths } from '../paths'

export const listCompany = () => {
    return baseApi.get(paths.listCompany())
}

export const createCompany = (data) => {
    return baseApi.post(paths.createCompany(), data)
}

export const loginCompany = (data) => {
    return baseApi.post(paths.loginCompany(), data)
}

export const sendInviteEmail = (data) => {
    return baseApi.post(paths.sendInviteEmail(), data)
}

export const verifyInvite = (data) => {
    return baseApi.post(paths.verifyInvite(), data)
}

export const confirmInvite = (data) => {
    return baseApi.post(paths.confirmInvite(), data)
}

export const getInviteLink = () => {
    return baseApi.post(paths.getInviteLink())
}

export const verifyLink = (data) => {
    return baseApi.post(paths.verifyLink(), data)
}

export const confirmLink = (data) => {
    return baseApi.post(paths.confirmLink(), data)
}
