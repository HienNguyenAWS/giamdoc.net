import baseApi from '../base.api'
import { paths } from '../paths'

export const getListPosts = ({ groupId, index, pageSize, type }) => {
    return baseApi.get(paths.getListPosts(groupId, index, pageSize, type))
}

export const getListPostsPriority = ({ groupId, type, priority, index, pageSize }) => {
    return baseApi.get(paths.getListPostsPriority(groupId, type, priority, index, pageSize))
}

export const getPost = id => {
    return baseApi.get(paths.getPost(id))
}

export const createPost = data => {
    return baseApi.post(paths.createPost(), data)
}

export const pinPost = data => {
    return baseApi.post(paths.pinPost(), data)
}

export const reactPost = data => {
    return baseApi.post(paths.reactPost(), data)
}

export const editPost = data => {
    return baseApi.put(paths.editPost(), data)
}

export const getComment = (id, index, size) => {
    return baseApi.get(paths.getComment(id, index, size))
}

export const getCommentPaging = (id, pageIndex, pageSize) => {
    return baseApi.get(paths.getCommentPaging(id, pageIndex, pageSize))
}

export const getPostEvent = id => {
    return baseApi.get(paths.getPostEvent(id))
}

export const createEvent = data => {
    console.log('SAGA CREATE')
    return baseApi.post(paths.createEvent(), data)
}

export const editEvent = ({ data, id }) => {
    return baseApi.put(paths.editEvent(id), data)
}

export const getListSearch = (key, page, size) => {
    return baseApi.get(paths.getListSearch(key, page, size))
}

export const getListGroupSearch = (params, page, size) => {
    const { groupId, keySearch } = params
    return baseApi.get(paths.getListGroupSearch(keySearch, groupId, page, size))
}

export const createVote = data => {
    return baseApi.post(paths.createVote(), data)
}

export const updateVote = data => {
    return baseApi.put(paths.updateVote(), data)
}

export const voteAnswer = data => {
    return baseApi.post(paths.voteAnswer(), data)
}

export const savePostsHistory = data => {
    return baseApi.post(paths.savePostsHistory(), data)
}

export const deletePost = data => {
    return baseApi.delete(paths.deletePost(data))
}

export const getListPostInUserProfile = ({
    groupId,
    index,
    pageSize,
    userId,
    type,
    key
}) => {
    return baseApi.get(
        paths.getListPostInUserProfile(groupId, index, pageSize, userId, type, key)
    )
}

export const addAnswer = data => {
    return baseApi.post(paths.addAnswer(), data)
}

export const removeAnswer = data => {
    return baseApi.post(paths.removeAnswer(), data)
}

export const updateStatusTypePriority = data => {
    return baseApi.post(paths.updateStatusTypePriority(), data)
}

