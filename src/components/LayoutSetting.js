import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup, TransitionGroup } from 'react-transition-group'
import Header from './header-main/HeaderMain'
import { Row, Col, List, Card } from 'antd'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import BaseApi from '../services/api/base.api'

const site = process.env.REACT_APP_FIXED_DOMAIN
const LayoutSetting = ({ children, menu }) => {
    const [cookies, , removeCookie] = useCookies(['abizin_token'])

    const handleLogout = () => {
        removeCookie('abizin_token')
        window.location = `https://${site}`
    }

    useEffect(() => {
        if (cookies.abizin_token) {
            BaseApi.setToken(cookies.abizin_token)
        }
    }, [])

    return (
        <>
            {/* <Header /> */}
            <TransitionGroup>
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    <div
                        className="container-fluid setting-container"
                        style={{ paddingTop: '20px' }}
                    >
                        <div className="setting-wrapper">
                            <Row gutter={[32, 12]}>
                                <Col span={6}>
                                    <Card className="setting-menu">
                                        <h4>Cài đặt</h4>
                                        <div className="menu">
                                            <List
                                                dataSource={menu}
                                                renderItem={(item) => (
                                                    <List.Item className={'menu-item-wrapper'}>
                                                        {!item.btnLogout ? (
                                                            <Link to={item.url} className="menu-item">
                                                                <span
                                                                    className={`${item.isActive ? 'active' : ''}`}
                                                                >
                                                                    {item.label}
                                                                </span>
                                                            </Link>
                                                        ) : (
                                                            <span
                                                                onClick={handleLogout}
                                                                className="menu-item"
                                                            >
                                                                <span>{item.label}</span>
                                                            </span>
                                                        )}
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={16}>
                                    <div className="body">{children}</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </TransitionGroup>
        </>
    )
}

LayoutSetting.propTypes = {
    children: PropTypes.any,
    menu: PropTypes.array
}

export default LayoutSetting
