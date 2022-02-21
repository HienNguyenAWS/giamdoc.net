import createStorage from './createStorage'

const instance = createStorage('user-abizin')
const KEY_PROFILE = 'profile'
const KEY_TOKEN = 'token'
const KEY_REFRESH_TOKEN = 'refresh_token'
const KEY_LANGUAGE = 'language'
const TOKEN_EXPIRE = 'token_expired'

export const setProfile = (data) => instance.setValue(KEY_PROFILE, data)

export const setProfileLists = (data) => instance.setlistValue(data)

export const getValueUser = (key) => instance.getValue(key)

export const getProfile = () => instance.getValue(KEY_PROFILE)

export const setToken = (data) => instance.setValue(KEY_TOKEN, data)

export const setRefreshToken = (data) =>
    instance.setValue(KEY_REFRESH_TOKEN, data)

export const getToken = () => instance.getValue(KEY_TOKEN)

export const getRefreshToken = () => instance.getValue(KEY_REFRESH_TOKEN)

export const setLanguage = (data) => instance.setValue(KEY_LANGUAGE, data)

export const getLanguage = () => instance.getValue(KEY_LANGUAGE)

export const getLanguageId = () => {
    const profile = getProfile()
    return profile?.LanguageId || ''
}

export const clearToken = () => instance.clear()

export const isTokenExpired = () => instance.getValue(TOKEN_EXPIRE)

export const setTokenExpired = (data) => instance.setValue(TOKEN_EXPIRE, data)
