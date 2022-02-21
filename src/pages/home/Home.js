import React from 'react'
import { Row, Col, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import Layout from '../../components/Layout'
import './Home.scss'
import { useSelector } from 'react-redux'

import { selectToken } from '../../stores/global/global.selector'

import PAGES from '../../routes/constants'
import Banner from '../../assets/images/banner.svg'
import Wave from '../../assets/images/wave.svg'
import Logo from '../../assets/images/logo.svg'
import Media from '../../assets/images/media.svg'
import Task from '../../assets/images/task.svg'
import CRM from '../../assets/images/crm.svg'
import CallCenter from '../../assets/images/callcenter.svg'
import Dots from '../../assets/images/dots.svg'
import IphoneX from '../../assets/images/iphonex.svg'
import IphoneXWhite from '../../assets/images/iphone-white.svg'
import AppStore from '../../assets/images/appstore.svg'
import GooglePlay from '../../assets/images/googleplay.svg'

const Home = () => {
    const history = useHistory()
    const token = useSelector(selectToken())

    const goToRegister = () => {
        if (token) {
            return
        }
        history.push(PAGES.register)
    }
    return (
        <Layout>
            <div className="homepage">
                <div className="container-fluid background">
                    <div className="home-banner">
                        <Row>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 12 }}
                                className="d-flex align-items-center"
                            >
                                <div className="home-banner-content">
                                    <h1>
                                        Phần mềm kinh doanh duy <br />
                                        nhất mà bạn cần
                                    </h1>
                                    <p>
                                        Thay thế nhiều loại dịch vụ và ứng dụng với một hệ sinh thái
                                        duy nhất
                                        <br /> để vận hành doanh nghiệp của bạn.
                                    </p>
                                    {!token && (
                                        <Button onClick={goToRegister} className="btn-register">
                                            Đăng ký miễn phí
                                        </Button>
                                    )}
                                </div>
                            </Col>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 12 }}
                                className="d-flex justify-content-end"
                            >
                                <div className="home-banner-image">
                                    <img src={Banner} alt="banner" />
                                </div>
                            </Col>
                        </Row>
                        <img src={Wave} alt="wave" className="curve d-sm-block d-none" />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="home-content">
                        <div className="home-content-title">
                            <img src={Logo} alt="logo" /> <span>là gì?</span>
                        </div>
                        <div className="home-content-body">
                            <div className="card-columns">
                                <div className="home-content-card">
                                    <div className="home-content-card-image">
                                        <img src={Media} alt="media" />
                                    </div>
                                    <div className="home-content-card-body">
                                        <h2>Truyền thông</h2>
                                        <p>
                                            Công ty của bạn. Thống nhất. Dòng hoạt động, trò chuyện
                                            nhóm, lịch trình, nhóm làm việc và các công cụ hợp tác
                                            khác mà bạn có thể sử dụng.
                                        </p>
                                    </div>
                                </div>
                                <div className="home-content-card">
                                    <div className="home-content-card-image">
                                        <img src={CRM} alt="CRM" />
                                    </div>
                                    <div className="home-content-card-body">
                                        <h2>CRM</h2>
                                        <p>
                                            Tăng trưởng doanh số của bạn. Cải thiện tỷ lệ chuyển đổi,
                                            tự động hóa tiếp thị và phục vụ khách hàng tốt hơn với CRM
                                            miễn phí của chúng tôi
                                        </p>
                                    </div>
                                </div>
                                <div className="home-content-card">
                                    <div className="home-content-card-image">
                                        <img src={Task} alt="Task" />
                                    </div>
                                    <div className="home-content-card-body">
                                        <h2>Tác vụ và dự án</h2>
                                        <p>
                                            Làm được nhiều hơn. Gantt, Kanban, theo dõi thời gian, lập
                                            kế hoạch công việc, người dùng bên ngoài, v.v...
                                        </p>
                                    </div>
                                </div>

                                <div className="home-content-card">
                                    <div className="home-content-card-image">
                                        <img src={CallCenter} alt="CallCenter" />
                                    </div>
                                    <div className="home-content-card-body">
                                        <h2>Trung tâm Liên hệ</h2>
                                        <p>
                                            Yêu thích khách hàng của bạn Cung cấp hỗ trợ trong thời
                                            gian thực thông qua các kênh giao tiếp phổ biến. Mạng xã
                                            hội, trình nhắn tin, telephony, email hoặc trò chuyện trực
                                            tiếp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img src={Dots} alt="dots" className="dots-1" />
                            <img src={Dots} alt="dots" className="dots-2" />
                            <img src={Dots} alt="dots" className="dots-3" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid introduce-app">
                    <div className="home-content-app">
                        <Row>
                            <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
                                <div className="home-content-app-device-image">
                                    <img src={IphoneX} alt="device" />
                                    <img src={IphoneXWhite} alt="device" />
                                    <img src={Dots} alt="dots" className="dots-4" />
                                </div>
                            </Col>
                            <Col
                                xs={{ span: 24, order: 1 }}
                                lg={{ span: 12, order: 2 }}
                                className="d-flex align-items-center"
                            >
                                <div className="home-content-app-device-content">
                                    <h2>Di động và máy tính để bàn</h2>
                                    <p>
                                        ABIZIN đi kèm các ứng dụng di động và máy tính để bàn miễn
                                        phí trên Android, iOS
                                    </p>
                                    <div className="home-content-app-button">
                                        <a href="/">
                                            <img src={GooglePlay} alt="device" />
                                        </a>
                                        <a href="/">
                                            <img src={AppStore} alt="device" />
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

Home.propTypes = {}

export default Home
