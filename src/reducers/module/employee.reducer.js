import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE
} from 'constants/employee.constant'

import { fromJS } from 'immutable'

const initialState = fromJS({
    loading: false
})

function employeeReducer(employees = initialState, action) {
    const { type, payload } = action
    switch (type) {
    case CREATE_EMPLOYEE:
        return [...employees.set('loading', false), payload]
    case RETRIEVE_EMPLOYEES:
        return payload
    case UPDATE_EMPLOYEE:
        return employees.map((employee) => {
            if (employee.id === payload.id) {
                return {
                    ...employee,
                    ...payload
                }
            } else {
                return employee
            }
        })
    case DELETE_EMPLOYEE:
        return employees.filter(({ id }) => id !== payload.id)
    default:
        return employees.set('loading', false)
    }
}

export default employeeReducer