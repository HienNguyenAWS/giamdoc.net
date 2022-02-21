import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE
} from 'constants/employee.constant'

import employeeService from 'services/api/module/employee.service'

export const createEmployee = (fullName, gender, dayofbirth, startDayWorking, staffCode, email, department, position, phone) => async (dispatch) => {
    try {
        const res = await employeeService.create({ fullName, gender, dayofbirth, startDayWorking, staffCode, email, department, position, phone })
        dispatch({
            type: CREATE_EMPLOYEE,
            payload: res.data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const retrieveEmployees = () => async (dispatch) => {
    try {
        const res = await employeeService.getAll()
        dispatch({
            type: RETRIEVE_EMPLOYEES,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateEmployee = (id, data) => async (dispatch) => {
    try {
        const res = await employeeService.update(id, data)
        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deleteEmployee = (id) => async (dispatch) => {
    try {
        await employeeService.delete(id)
        dispatch({
            type: DELETE_EMPLOYEE,
            payload: { id }
        })
    } catch (err) {
        console.log(err)
    }
}