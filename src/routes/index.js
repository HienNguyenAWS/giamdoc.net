import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoginScreen from '../pages/login/Login'
import RegisterScreen from '../pages/register/Register'
import ForgotPassScreen from '../pages/forgot-password/ForgotPassword'
import VerifyInvite from '../pages/verify-invite/VerifyInvite'
import VerifyLink from '../pages/verify-link/VerifyLink'
import PayGradesScreen from '../pages/pay-grades/PayGrades'
import PayGradesDetailScreen from '../pages/pay-grades/PayGradesDetail'
import EmployeesScreen from '../pages/employee/Employee'

import PAGES from './constants'
import { MainRoutes } from './MainRoutes'
import { Splash } from '../Splash'

export const Routes = () => {
    const [loading, setLoading] = React.useState(true)
    const [isHome, setIsHome] = React.useState(true)

    useEffect(() => {
        if (window.location.hostname.split('.').length === 2) {
            setIsHome(true)
            setLoading(false)
        } else {
            setIsHome(false)
            setLoading(false)
        }
    }, [])

    return (
        <Switch>
            <Route path={PAGES.splash} component={Splash} exact />
            <Route path={PAGES.verifyInvite} component={VerifyInvite} exact />
            <Route path={PAGES.verifyLink} component={VerifyLink} exact />
            <Route path={PAGES.payGrades} component={PayGradesScreen} exact/>
            <Route path={PAGES.payGradesDetail} component={PayGradesDetailScreen} exact/>
            <Route path={PAGES.employees} component={EmployeesScreen}/>
            {/* <Route path={PAGES.payGradesDetail1} component={PayGradesDetail01Screen} exact/> */}

            {!loading ? (
                isHome ? (
                    <>
                        {/* <Route path={PAGES.home} component={HomeScreen} exact /> */}
                        <Route path={PAGES.login} component={LoginScreen} exact />
                        <Route path={PAGES.register} component={RegisterScreen} exact />
                        <Route path={PAGES.forgotPass} component={ForgotPassScreen} exact />
                        <Redirect from="*" to={PAGES.login} />
                    </>
                ) : (
                    <MainRoutes />
                )
            ) : null}
        </Switch>
    )
}