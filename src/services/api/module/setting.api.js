import baseApi from '../base.api'
import { paths } from '../paths'

export const getSettings = () => {
    return baseApi.get(paths.getSettings())
}

export const updateSetting = (data) => {
    return baseApi.post(paths.updateSetting(), data)
}
