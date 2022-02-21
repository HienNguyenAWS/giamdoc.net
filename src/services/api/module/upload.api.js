import baseApi from '../base.api'
import { paths } from '../paths'

export const uploadFile = (data, type) => {
    return baseApi.post(paths.uploadFile(type), data)
}
