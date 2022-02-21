import React, { useState, useEffect } from 'react'
import { Input, Button, Checkbox, Space, Row, Col } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import LoginLayout from '../../components/login-layout'
import './register.scss'
import BigLogo from '../../assets/new/common/logo.svg'
import Facebook from '../../assets/new/login/facebook.svg'
import Google from '../../assets/new/login/google.svg'

import {
    loginSocial,
    resetError,
    register
} from '../../stores/global/global.action'
import {
    selectToken,
    selectError,
    selectLoadingFacebook,
    selectLoadingGoogle,
    selectLoading
} from '../../stores/global/global.selector'
import toaster from '../../components/toaster'
import BoxLoading from '../../components/box-loading/BoxLoading'
import PAGES from '../../routes/constants'
import { FB_APP_ID, GG_CLIENT_ID } from '../../constants/config'
import { validateEmail } from '../../utils'

const Register = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken())
    const isLoadingFB = useSelector(selectLoadingFacebook())
    const isLoadingGG = useSelector(selectLoadingGoogle())
    const error = useSelector(selectError())
    const loading = useSelector(selectLoading())
    const history = useHistory()
    const [isSubmit, setSubmit] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const responseFacebook = (response) => {
        dispatch(
            loginSocial({
                token: response.accessToken,
                type: 2,
                profileObj: {
                    name: response.name,
                    email: response.email,
                    picture: response.picture
                }
            })
        )
    }

    useEffect(() => {
        return () => {
            dispatch(resetError())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (token) {
            history.push('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    useEffect(() => {
        if (error) {
            toaster.error(error)
            dispatch(resetError())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const responseGoogle = (resp) => {
        if (resp?.accessToken) {
            dispatch(
                loginSocial({
                    token: resp.accessToken,
                    type: 1,
                    profileObj: {
                        name: resp?.profileObj.name,
                        email: resp?.profileObj.email
                    }
                })
            )
        }
    }

    const onChange = () => {}

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (email.trim() === '' || password.trim() === '' || firstName.trim() === '' || lastName.trim() === '') {
            return
        }
        if (password.trim().length <= 6) {
            return
        }
        if (!validateEmail(email)) {
            return
        }
        const body = {
            userName: email,
            passWord: password,
            firstName: firstName,
            lastName: lastName
        }
        dispatch(register(body))
    }

    return (
        <LoginLayout>
            <div className='login-form'>
                <div className='not-have-account d-sm-block d-none'>
                    <span>
            Đã có tài khoản? <Link to={PAGES.login}>Đăng nhập</Link>
                    </span>
                </div>
                <div className='logo-mobile d-sm-none d-block'>
                    <Link to={PAGES.home}>
                        <img src={BigLogo} alt='logo' />
                    </Link>
                </div>
                <div className='form'>
                    <h3>
                        <span>Đăng ký</span>
                    </h3>
                    <div className='login-social'>
                        <GoogleLogin
                            clientId={GG_CLIENT_ID}
                            render={(renderProps) => (
                                <Button className='btn-google' onClick={renderProps.onClick}>
                                    {isLoadingGG ? (
                                        <BoxLoading />
                                    ) : (
                                        <Space>
                                            <img src={Google} />
                                            <span>Đăng ký bằng Google</span>
                                        </Space>
                                    )}
                                </Button>
                            )}
                            buttonText=''
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            className='with-smedia google'
                            cookiePolicy={'single_host_origin'}
                        />
                        <FacebookLogin
                            appId={FB_APP_ID}
                            // autoLoad={true}
                            fields='name,email,picture'
                            callback={responseFacebook}
                            cssClass='ant-btn btn-facebook'
                            textButton={isLoadingFB ? <BoxLoading /> : <img src={Facebook} />}
                        />
                    </div>
                    <div className='divider'>Hoặc</div>
                    <form onSubmit={handleSubmit}>
                        <div className='email-wrapper'>
                            <label htmlFor='email'>
                                <span>Nhập địa chỉ e-mail</span>
                                <Input
                                    id='email'
                                    placeholder='Nhập email'
                                    autoComplete='off'
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                                {isSubmit && !email && email.trim() === '' && (
                                    <p className='error'>Vui lòng nhập email</p>
                                )}
                                {isSubmit && email && !validateEmail(email.trim()) && (
                                    <p className='error'>Vui lòng nhập đúng định dạng email</p>
                                )}
                            </label>
                        </div>
                        <Row gutter={[16, 32]} className='email-wrapper'>
                            <Col span={12}>
                                <span className="title">Nhập Tên</span>
                                <Input
                                    placeholder='Nhập tên'
                                    autoComplete='off'
                                    value={lastName}
                                    onChange={handleChangeLastName}
                                />
                                {isSubmit && !lastName && lastName.trim() === '' && (
                                    <p className='error'>Vui lòng nhập tên</p>
                                )}
                            </Col>
                            <Col span={12}>
                                <span className="title">Nhập Họ</span>
                                <Input
                                    placeholder='Nhập họ'
                                    autoComplete='off'
                                    value={firstName}
                                    onChange={handleChangeFirstName}
                                />
                                {isSubmit && !firstName && firstName.trim() === '' && (
                                    <p className='error'>Vui lòng nhập họ</p>
                                )}
                            </Col>
                        </Row>
                        <div className='password-wrapper'>
                            <label htmlFor='password'>
                                <span>Mật khẩu</span>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Mật khẩu lớn hơn 6 kí tự'
                                    autoComplete='off'
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                {isSubmit && !password && password.trim() === '' && (
                                    <p className='error'>Vui lòng nhập mật khẩu</p>
                                )}
                                {isSubmit &&
                  password.trim() !== '' &&
                  password.trim().length <= 6 && (
                                    <p className='error'>
                      Vui lòng nhập mật khẩu lớn hơn 6 ký tự
                                    </p>
                                )}
                            </label>
                        </div>
                        <div className='form-policy'>
                            <p className='policy-content'>
                Tạo tài khoản có nghĩa là bạn đồng ý với{' '}
                                <a href='/'>Điều khoản dịch vụ, Chính sách quyền riêng tư</a> và
                Cài đặt thông báo mặc định của chúng tôi.
                            </p>
                            <p className='form-checkbox'>
                                <Checkbox onChange={onChange} defaultChecked>
                  Tôi muốn nhận thông tin cập nhật sản phẩm và ưu đãi đặc biệt
                                </Checkbox>
                            </p>
                            <p className='form-checkbox'>
                                <Checkbox onChange={onChange} defaultChecked>
                  Tôi muốn nhận tài liệu đào tạo
                                </Checkbox>
                            </p>
                        </div>
                        <Button
                            htmlType='submit'
                            className='btn-submit'
                            loading={loading}
                            onClick={handleSubmit}
                        >
              Đăng ký
                        </Button>
                        <div className='not-have-account mobile d-sm-none d-block'>
                            <span>
                Đã có tài khoản? <Link to={PAGES.login}>Đăng nhập</Link>
                            </span>
                        </div>
                    </form>
                    <div className='copyright'>
                        <p>
              Website này được bảo vệ bởi reCAPTCHA và áp dụng Chính sách Quyền
              Riêng tư và Điều khoản Dịch vụ của Google
                        </p>
                    </div>
                </div>
            </div>
        </LoginLayout>
    )
}

Register.propTypes = {}

export default Register
