import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup, TransitionGroup } from 'react-transition-group'
import Header from './header/Header'
import { getToken } from '../services/storages/userStorage'
import BaseApi from '../services/api/base.api'

class Layout extends React.Component {
    componentDidMount() {
        const token = getToken()
        if (token) {
            BaseApi.setToken(token)
        }
    }

    render() {
        return (
            <>
                <Header />
                <TransitionGroup>
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={300}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        <div className="body">{this.props.children}</div>
                    </CSSTransitionGroup>
                </TransitionGroup>
            </>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.any
}

export default Layout
