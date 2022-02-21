import baseApi from '../base.api'
import { paths } from '../paths'

export const changeLanguage = (data) => {
    return baseApi.put(paths.changeLanguage(), data)
}

export const getListLanguage = () => {
    return baseApi.get(paths.getListLanguage())
}
