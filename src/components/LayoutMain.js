import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup, TransitionGroup } from 'react-transition-group'
import { withCookies } from 'react-cookie'
import Header from './header-main/HeaderMain'
import BaseApi from '../services/api/base.api'
class Layout extends React.Component {
    componentDidMount() {
        if (this.props?.cookies?.cookies?.abizin_token) {
            BaseApi.setToken(this.props?.cookies?.cookies?.abizin_token)
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
    children: PropTypes.any,
    cookies: PropTypes.any
}

export default withCookies(Layout)
