import { createSelector } from 'reselect'

const storeName = 'global'
export const selectGlobalStore = (state) => state.get(storeName, {})

export const selectUser = () =>
    createSelector(selectGlobalStore, (state) => state.get('user', null))

export const selectToken = () =>
    createSelector(selectGlobalStore, (state) => state.get('userToken', null))

export const selectError = () =>
    createSelector(selectGlobalStore, (state) => state.get('error', null))

export const selectLoading = () =>
    createSelector(selectGlobalStore, (state) => state.get('loading', null))

export const selectListLanguage = () =>
    createSelector(selectGlobalStore, (state) => state.get('listLang', []))

export const selectMyLanguage = () =>
    createSelector(selectGlobalStore, (state) => state.get('lang', 'vi'))

export const selectLoadingFacebook = () =>
    createSelector(selectGlobalStore, (state) =>
        state.get('loadingFacebook', null)
    )

export const selectLoadingGoogle = () =>
    createSelector(selectGlobalStore, (state) =>
        state.get('loadingGoogle', null)
    )

export const selectGroupType = () =>
    createSelector(selectGlobalStore, (state) => state.get('groupType', []))
