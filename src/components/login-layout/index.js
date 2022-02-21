import React from 'react'
import { Row, Col, Space } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BigLogo from '../../assets/new/common/logo.svg'
import ArrowLeft from '../../assets/new/login/arrow-left.svg'
import Dots1 from '../../assets/new/login/dots-1.svg'
import Dots2 from '../../assets/new/login/dots-2.svg'
import PAGES from '../../routes/constants'

import './styles.scss'

const LoginLayout = ({ children }) => {
    return (
        <div className='login-layout'>
            <Row>
                <Col
                    span={10}
                    className='login-banner-col d-lg-flex d-none justify-content-center align-items-center'
                >
                    <div className='login-banner'>
                        <img src={BigLogo} alt='logo' />
                        <h4>Tạo công ty của bạn</h4>
                        <p>Trực tuyến - Miễn phí</p>
                    </div>
                    <img src={Dots1} alt='dots' className='dots-1' />
                    <img src={Dots2} alt='dots' className='dots-2' />
                    <img src={Dots2} alt='dots' className='dots-3' />
                    <div className='btn-back-wrapper'>
                        <Link className='ant-btn btn-back' to={PAGES.home}>
                            <Space>
                                <img src={ArrowLeft} />
                                <span>Quay lại website</span>
                            </Space>
                        </Link>
                    </div>
                </Col>
                <Col span={24} lg={14} className='login-form-col'>
                    {children}
                </Col>
            </Row>
        </div>
    )
}

LoginLayout.propTypes = {
    children: PropTypes.element
}

export default LoginLayout
