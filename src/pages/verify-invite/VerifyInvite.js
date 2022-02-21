import React, { useEffect, useState, useRef } from 'react'
import { Input, Button, Row, Col, Checkbox, Space, Divider } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import LoginLayout from '../../components/login-layout'

import { login, resetError } from '../../stores/global/global.action'
import {
    selectError,
    selectToken,
    selectLoadingFacebook,
    selectLoadingGoogle
} from '../../stores/global/global.selector'

import BigLogo from '../../assets/new/common/logo.svg'
import Facebook from '../../assets/new/login/facebook.svg'
import Google from '../../assets/new/login/google.svg'

import PAGES from '../../routes/constants'
import toaster from '../../components/toaster'
import LoadingScreen from '../../components/loading/Loading'
import API from '../../services/api'
import errors from '../../constants/error'
import { PROCESS_SUCCESS } from '../../constants/strings'
import BoxLoading from '../../components/box-loading/BoxLoading'
import { FB_APP_ID, GG_CLIENT_ID } from '../../constants/config'
import { validateEmail } from '../../utils'
import {
    loginSocial
} from '../../stores/global/global.action'

const FIXED_DOMAIN = process.env.REACT_APP_FIXED_DOMAIN

const VerifyInvite = () => {
    const dispatch = useDispatch()
    const error = useSelector(selectError())
    const token = useSelector(selectToken())
    const isLoadingFB = useSelector(selectLoadingFacebook())
    const isLoadingGG = useSelector(selectLoadingGoogle())
    const companyId = useRef()
    const haveError = useRef(false)

    const [isSubmit, setSubmit] = useState(false)
    const [infoInvitation, setInfoInvitation] = useState({})
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isShowForm, setShowForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingCompany, setLoadingCompany] = useState(false)
    const [isRegisteredAccount, setIsRegisteredAccount] = useState(false)

    const query = queryString.parse(window.location.search)
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

    useEffect(() => {
        handleVerify()
    })

    const handleVerify = async () => {
        if (!query.email || !query.tokenVerify) {
            history.push('/')
        }

        try {
            const result = await API.company.verifyInvite({
                inviteCode: query.tokenVerify,
                email: query.email
            })

            if (result?.code === 500) {
                setShowForm(false)
                haveError.current = true
                toaster.error(
                    errors[result?.message] ? errors[result?.message] : result?.message
                )
            } else if (result?.code !== 209) {
                setInfoInvitation(result?.data || {})

                if (result?.data?.CompanyId) {
                    companyId.current = +result?.data?.CompanyId || 0
                    setIsRegisteredAccount(true)
                    setShowForm(false)
                    toaster.info('Tài khoản đã tồn tại, hãy đăng nhập để vào công ty')
                }
            }
        } catch (e) {
            console.log('error', e)
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        if (
            firstName.trim() === '' ||
      password.trim() === '' ||
      password.trim().length <= 6 ||
      lastName.trim() === '' ||
      confirmPassword.trim() === ''
        ) {
            return
        }

        try {
            setLoading(true)
            const result = await API.company.confirmInvite({
                inviteCode: query.tokenVerify,
                password: password,
                firstName: firstName,
                lastName: lastName
            })

            if (result?.code === 500) {
                toaster.error(result?.message)
            } else if (result?.code === 200 && result?.message === PROCESS_SUCCESS) {
                if (!token) {
                    const body = {
                        userName: query.email || '',
                        passWord: password || '',
                        type: 3
                    }
                    dispatch(login(body))
                }

                companyId.current = result?.data.Id || 0
            }
        } catch (e) {
            console.log('error', e)
        } finally {
            setLoading(false)
        }
    }

    const onChange = () => {}

    const handleLogin = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (email.trim() === '' || password.trim() === '') {
            return
        }
        if (!validateEmail(email)) {
            return
        }
        const body = {
            userName: email || '',
            passWord: password || '',
            type: 3
        }
        dispatch(login(body))
    }

    useEffect(() => {
        if (token && !haveError.current && isSubmit) {
            try {
                setLoadingCompany(true)
                API.company
                    .loginCompany({
                        CompanyId: companyId.current
                    })
                    .then((res) => {
                        window.location = `https://${res?.data?.Slugname}.${FIXED_DOMAIN}${PAGES.splash}?access_token=${res?.data?.token}`
                    })
                    .catch((e) => {
                        toaster.error(e)
                    })
            } catch (e) {
                console.log('error', e)
            } finally {
                setLoadingCompany(false)
            }
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

    return (
        <>
            {loadingCompany && <LoadingScreen size={40} isWhite />}
            <LoginLayout>
                {isShowForm && (
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
                                <span>Đăng ký trong Công ty {infoInvitation?.CompanyName}</span>
                            </h3>
                            <p className='subtitle mb--24'>
                Bạn đã được mời tham gia ABIZIN từ bangnc.hn@gmail.com. Vui lòng
                tạo một mật khẩu để hoàn tất đăng ký.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <Row gutter={[25, 25]}>
                                    <Col span={12}>
                                        <div className='firstname-wrapper'>
                                            <label htmlFor='firstname'>
                                                <span>Nhập Tên</span>
                                                <Input
                                                    id='firstname'
                                                    placeholder='Nhập tên'
                                                    autoComplete='off'
                                                    value={firstName}
                                                    onChange={handleChangeFirstName}
                                                />
                                                {isSubmit && !firstName && firstName.trim() === '' && (
                                                    <p className='error'>Vui lòng nhập tên</p>
                                                )}
                                            </label>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='firstname-wrapper'>
                                            <label htmlFor='lastname'>
                                                <span>Nhập Họ</span>
                                                <Input
                                                    id='lastname'
                                                    placeholder='Nhập họ'
                                                    autoComplete='off'
                                                    value={lastName}
                                                    onChange={handleChangeLastName}
                                                />
                                                {isSubmit && !lastName && lastName.trim() === '' && (
                                                    <p className='error'>Vui lòng nhập họ</p>
                                                )}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>

                                <div className='password-wrapper'>
                                    <label htmlFor='password'>
                                        <span>Nhập mật khẩu</span>
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
                                        {isSubmit && password && password.trim().length <= 6 && (
                                            <p className='error'>Mật khẩu phải lớn hơn 6 ký tự</p>
                                        )}
                                    </label>
                                </div>

                                <div className='confirm-password-wrapper'>
                                    <label htmlFor='confirmpassword'>
                                        <span>Xác nhận mật khẩu</span>
                                        <Input
                                            id='confirmpassword'
                                            type='password'
                                            placeholder='Mật khẩu lớn hơn 6 kí tự'
                                            autoComplete='off'
                                            value={confirmPassword}
                                            onChange={handleChangeConfirmPassword}
                                        />
                                        {isSubmit &&
                      !confirmPassword &&
                      confirmPassword.trim() === '' && (
                                            <p className='error'>Vui lòng nhập xác nhận mật khẩu</p>
                                        )}
                                        {isSubmit &&
                      password &&
                      confirmPassword &&
                      password.trim() !== confirmPassword.trim() && (
                                            <p className='error'>
                          Mật khẩu xác nhận chưa trùng khớp
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className='form-policy mt--24'>
                                    <p className='policy-content'>
                    Tạo tài khoản có nghĩa là bạn đồng ý với{' '}
                                        <a href='/'>
                      Điều khoản dịch vụ, Chính sách quyền riêng tư
                                        </a>{' '}
                    và Cài đặt thông báo mặc định của chúng tôi.
                                    </p>
                                    <p className='form-checkbox'>
                                        <Checkbox onChange={onChange} defaultChecked>
                      Tôi muốn nhận thông tin cập nhật sản phẩm và ưu đãi đặc
                      biệt
                                        </Checkbox>
                                    </p>
                                    <p className='form-checkbox'>
                                        <Checkbox onChange={onChange} defaultChecked>
                      Tôi muốn nhận tài liệu đào tạo
                                        </Checkbox>
                                    </p>
                                </div>
                                <Button
                                    loading={loading}
                                    htmlType='submit'
                                    className='btn-submit'
                                    onClick={handleSubmit}
                                >
                  Tạo tài khoản
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

                {isRegisteredAccount && (
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
                                        <Button
                                            className='btn-google'
                                            onClick={renderProps.onClick}
                                        >
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
                            <form onSubmit={handleLogin}>
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
                                            <p className='error'>
                        Vui lòng nhập đúng định dạng email
                                            </p>
                                        )}
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
                                    onClick={handleLogin}
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
                )}
            </LoginLayout>
        </>
    )
}

VerifyInvite.propTypes = {}

export default VerifyInvite
