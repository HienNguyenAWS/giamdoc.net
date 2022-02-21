import React, { useEffect, useState } from 'react'
import { Input, Button, Space, Divider } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import LoginLayout from '../../components/login-layout'

import BigLogo from '../../assets/new/common/logo.svg'
import Facebook from '../../assets/new/login/facebook.svg'
import Google from '../../assets/new/login/google.svg'

import PAGES from '../../routes/constants'
import { FB_APP_ID, GG_CLIENT_ID } from '../../constants/config'
import {
    loginSocial,
    resetError,
    login
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
import {
    isTokenExpired
} from '../../services/storages/userStorage'

const Login = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken())
    const isLoadingFB = useSelector(selectLoadingFacebook())
    const isLoadingGG = useSelector(selectLoadingGoogle())
    const error = useSelector(selectError())
    const loading = useSelector(selectLoading())
    const [isSubmit, setSubmit] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const responseFacebook = (response) => {
        if (response?.status === 'unknown') {
            return
        }
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
        const tokenExpiredLang = isTokenExpired()
        if (tokenExpiredLang) {
            // if (lang[tokenExpiredLang]) {
            //   toaster.error(lang[tokenExpiredLang]['token.expired']);
            // } else {
            //   toaster.error(lang['vi']['token.expired']);
            // }
            // clearToken();
        }
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
        console.log('google', resp)
        if (resp?.accessToken) {
            dispatch(
                loginSocial({
                    token: resp.accessToken,
                    profileObj: {
                        name: resp?.profileObj.name,
                        email: resp?.profileObj.email
                    },
                    type: 1
                })
            )
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (email.trim() === '' || password.trim() === '') {
            return
        }
        // if (!validateEmail(email)) {
        //   return;
        // }
        const body = {
            userName: email || '',
            password: password || ''
        }
        dispatch(login(body))
    }

    return (
        <LoginLayout>
            <div className='login-form'>
                <div className='not-have-account d-sm-block d-none'>
                    <span>
            Chưa có tài khoản? <Link to={PAGES.register}>Đăng ký</Link>
                    </span>
                </div>
                <div className='logo-mobile d-sm-none d-block'>
                    <Link to={PAGES.home}>
                        <img src={BigLogo} alt='logo' />
                    </Link>
                </div>
                <div className='form'>
                    <h3>
                        <span>Đăng nhập</span>
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
                                            <span>Đăng nhập bằng Google</span>
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
                            fields='name,email,picture'
                            callback={responseFacebook}
                            cssClass='ant-btn btn-facebook'
                            textButton={isLoadingFB ? <BoxLoading /> : <img src={Facebook} />}
                        />
                    </div>
                    <Divider>Hoặc</Divider>
                    <form onSubmit={handleSubmit}>
                        <div className='email-wrapper'>
                            <label htmlFor='email'>
                                <span>Tên tài khoản</span>
                                <Input
                                    id='email'
                                    placeholder='Tên tài khoản'
                                    autoComplete='off'
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                                {isSubmit && !email && email.trim() === '' && (
                                    <p className='error'>Vui lòng nhập tên tài khoản</p>
                                )}
                                {/* {isSubmit && email && !validateEmail(email.trim()) && (
                  <p className='error'>Vui lòng nhập đúng định dạng email</p>
                )} */}
                            </label>
                        </div>
                        <div className='password-wrapper'>
                            <label htmlFor='password'>
                                <span>Mật khẩu</span>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Nhập mật khẩu'
                                    autoComplete='off'
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                                {isSubmit && !password && password.trim() === '' && (
                                    <p className='error'>Vui lòng nhập mật khẩu</p>
                                )}
                            </label>
                            <Link to={PAGES.forgotPass}>
                                <span className='forget-password'>Quên mật khẩu</span>
                            </Link>
                        </div>
                        <Button
                            loading={loading}
                            htmlType='submit'
                            className='btn-submit'
                            onClick={handleSubmit}
                        >
              Đăng nhập
                        </Button>
                        <div className='not-have-account mobile d-sm-none d-block'>
                            <span>
                Chưa có tài khoản? <Link to={PAGES.register}>Đăng ký</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </LoginLayout>
    )
}

Login.propTypes = {}

export default Login
