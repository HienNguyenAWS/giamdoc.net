import { createSelector } from 'reselect'

const storeName = 'payGrade03'
const selectStore = state => state.get(storeName, {})

export const selectPayGrades = createSelector(selectStore, state => state.get('payGrades', []))

export const selectSalary = createSelector(selectStore, state => state.get('salary', null))
