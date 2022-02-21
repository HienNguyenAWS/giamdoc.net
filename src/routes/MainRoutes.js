import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SocialScreen from '../pages/social/Social'
import PAGES from './constants'

export const MainRoutes = () => {

    return (
        <Switch>
            <Route path={PAGES.home} component={SocialScreen} />

            <Redirect from="*" to={PAGES.home} />
        </Switch>
    )
}
