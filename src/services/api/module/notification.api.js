import baseApi from '../base.api'
import { paths } from '../paths'

export const getListNoti = () => {
    return baseApi.get(paths.notification())
}

export const seenNoti = (data) => {
    return baseApi.post(paths.seenNoti(), data)
}
