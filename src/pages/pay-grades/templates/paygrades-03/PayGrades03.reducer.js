/* eslint-disable indent */
import { fromJS } from 'immutable'
import { ADD_LEVEL, ADD_PAYGRADE, DELETE_PAYGRADE } from './PayGrades03.action'
import { v4 as uuidv4 } from 'uuid'

const initialState = fromJS({
    payGrades: [
        {
            id: 1,
            titleTable: 'Ngạch lương quản lý, điều hành'
        },
        {
            id: 2,
            titleTable: 'Ngạch lương nhân viên'
        }
    ],

    salary: 4_500_000
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAYGRADE: {
            const payGrade = { id: uuidv4(), ...action.payload }
            const newPayGrades = state.get('payGrades').toJS()
            newPayGrades.push(payGrade)
            return state.set('payGrades', fromJS(newPayGrades))
        }

        case DELETE_PAYGRADE: {
            const newPayGrades = state.get('payGrades').filter(payGrade => payGrade.get('id') !== action.payload)
            return state.set('payGrades', newPayGrades)
        }

        default:
            return state
    }
}

export default reducer
