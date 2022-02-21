const path = 'pages/pay-grades/templates/paygrades-03'

export const ADD_LEVEL = `${path}ADD_LEVEL`

export const ADD_PAYGRADE = `${path}ADD_PAYGRADE`

export const DELETE_PAYGRADE = `${path}DELETE_PAYGRADE`

export const addLevel = () => ({
    type: ADD_LEVEL
})

export const addPayGrade = formValues => ({
    type: ADD_PAYGRADE,
    payload: formValues
})

export const deletePayGrade = id => ({
    type: DELETE_PAYGRADE,
    payload: id
})
