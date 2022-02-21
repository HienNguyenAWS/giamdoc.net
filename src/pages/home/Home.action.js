const path = 'pages/Home/'

export const GET_LIST_COMPANY = `${path}GET_LIST_COMPANY`
export const GET_LIST_COMPANY_SUCCESS = `${path}GET_LIST_COMPANY_SUCCESS`
export const GET_LIST_COMPANY_ERROR = `${path}GET_LIST_COMPANY_ERROR`
export const CREATE_COMPANY = `${path}CREATE_COMPANY`
export const CREATE_COMPANY_ERROR = `${path}CREATE_COMPANY_ERROR`
export const CREATE_COMPANY_SUCCESS = `${path}CREATE_COMPANY_SUCCESS`

export const getListCompany = () => ({
    type: GET_LIST_COMPANY
})

export const getListCompanySuccess = (data) => ({
    type: GET_LIST_COMPANY_SUCCESS,
    payload: data
})

export const getListCompanyError = (error) => ({
    type: GET_LIST_COMPANY_ERROR,
    payload: error
})

export const createCompany = (data) => ({
    type: CREATE_COMPANY,
    payload: data
})

export const createCompanySuccess = (data) => ({
    type: CREATE_COMPANY_SUCCESS,
    payload: data
})

export const createCompanyError = (data) => ({
    type: CREATE_COMPANY_ERROR,
    payload: data
})
