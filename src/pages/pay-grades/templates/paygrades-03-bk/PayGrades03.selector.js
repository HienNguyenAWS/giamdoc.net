import { createSelector } from 'reselect'

const storeName = 'payGrade03'
const selectStore = state => state.get(storeName, {})

const selectPayGrades = createSelector(selectStore, state => state.get('payGrades', []))

const selectSalary = createSelector(selectStore, state => state.get('salary', null))

const selectAmplitude = createSelector(selectStore, state => state.get('amplitude', null))

const selectCoefficient = createSelector(selectStore, state => state.get('coefficient', null))

const selectLevel = createSelector(selectStore, state => state.get('level', null))

export { selectPayGrades, selectSalary, selectAmplitude, selectCoefficient, selectLevel }
