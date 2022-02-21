import baseApi from '../base.api'
import { paths } from '../paths'

export const toggleJoinEvent = (data) => {
    return baseApi.post(paths.toggleJoinEvent(), data)
}
export const getListPosts = (groupId, index, pageSize, type) => {
    return baseApi.get(paths.getListPosts(groupId, index, pageSize, type))
}

export const getListEventByTime = ({ key, groupId, index, pageSize, type, option }) => {
    return baseApi.get(paths.getListEventByTime(key, groupId, index, pageSize, type, option))
}

export const userJoinEvent = (data) => {
    return baseApi.post(paths.userJoinEvent(), data)
}

export const userConsiderEvent = (data) => {
    return baseApi.post(paths.userConsiderEvent(), data)
}

export const getListPlace = () => {
    return baseApi.get(paths.getListPlace())
}