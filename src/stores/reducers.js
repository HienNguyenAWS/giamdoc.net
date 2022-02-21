/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable'
import globalReducer from './global/global.reducer'
import headerReducer from '../components/header/Header.reducer'
import headerMainReducer from '../components/header-main/HeaderMain.reducer'
import payGrade03Reducer from 'pages/pay-grades/templates/paygrades-03/PayGrades03.reducer'

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer () {
    return combineReducers({
        global: globalReducer,
        header: headerReducer,
        headerMain: headerMainReducer,
        payGrade03: payGrade03Reducer
    })
}
