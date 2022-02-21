import baseApi from '../base.api'
import { paths } from '../paths'

export const getAllGroup = () => {
    return baseApi.get(paths.getAllGroup())
}

export const getListGroup = (data) => {
    return baseApi.get(paths.getListGroup(data))
}//keySearch, page, size

export const searchListGroup = (keySearch, page, size) => {
    return baseApi.get(paths.searchListGroup(keySearch, page, size))
}

export const createGroup = (data) => {
    return baseApi.post(paths.createGroup(), data)
}

export const editGroup = (data, id) => {
    return baseApi.put(paths.editGroup(id), data)
}

export const getGroupDetail = (id) => {
    return baseApi.get(paths.getGroupDetail(id))
}

export const getGroupType = (languageId) => {
    return baseApi.get(paths.getGroupType(languageId))
}

export const deleteGroup = (id) => {
    return baseApi.delete(paths.deleteGroup(id))
}

export const removeMember = (data) => {
    return baseApi.delete(paths.removeGroupMember(), data)
}

export const uploadFile = (data) => {
    return baseApi.post(paths.saveUserImage(), data)
}

export const getListPostsGroup = (groupId, type, page, pageSize) => {
    return baseApi.get(paths.getListPostsGroup(groupId, type, page, pageSize))
}

export const getListImageGroup = (groupId, page, pageSize) => {
    return baseApi.get(paths.getListImage(groupId, page, pageSize))
}

export const getListUserRequestGroup = (payload) => {
    return baseApi.get(paths.getListUserRequestGroup(payload))
}

export const memberApproveJoinGroup = (payload) => {
    return baseApi.post(paths.memberApproveJoinGroup(), payload)
}

export const approveUserRequestGroup = (payload) => {
    return baseApi.post(paths.approveUserRequestGroup(), payload)
}

export const requestJoinGroup = (data) => {
    return baseApi.post(paths.requestJoinGroup(), data)
}

export const outGroup = (data) => {
    return baseApi.post(paths.outGroup(), data)
}

export const getListUserInviteGroup = (payload) => {
    return baseApi.get(paths.getListUserInviteGroup(payload))
}

export const submitListUserInviteGroup = (payload) => {
    return baseApi.post(paths.submitListUserInviteGroup(), payload)
}