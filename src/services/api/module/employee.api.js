import baseApi from '../base.api'
import { paths } from '../paths'

export const getListEmployees = () => {
    return baseApi.get(paths.listEmployees())
}

export const getListEmployeesSuggestGroup = id => {
    return baseApi.get(paths.listEmployeesSuggestGroup(id))
}

export const getEmployeeByName = name => {
    return baseApi.get(paths.getEmployeeByName(name))
}
