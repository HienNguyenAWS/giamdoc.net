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
                    toaster.info('T??i kho???n ???? t???n t???i, h??y ????ng nh???p ????? v??o c??ng ty')
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
                ???? c?? t??i kho???n? <Link to={PAGES.login}>????ng nh???p</Link>
                            </span>
                        </div>
                        <div className='logo-mobile d-sm-none d-block'>
                            <Link to={PAGES.home}>
                                <img src={BigLogo} alt='logo' />
                            </Link>
                        </div>
                        <div className='form'>
                            <h3>
                                <span>????ng k?? trong C??ng ty {infoInvitation?.CompanyName}</span>
                            </h3>
                            <p className='subtitle mb--24'>
                B???n ???? ???????c m???i tham gia ABIZIN t??? bangnc.hn@gmail.com. Vui l??ng
                t???o m???t m???t kh???u ????? ho??n t???t ????ng k??.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <Row gutter={[25, 25]}>
                                    <Col span={12}>
                                        <div className='firstname-wrapper'>
                                            <label htmlFor='firstname'>
                                                <span>Nh???p T??n</span>
                                                <Input
                                                    id='firstname'
                                                    placeholder='Nh???p t??n'
                                                    autoComplete='off'
                                                    value={firstName}
                                                    onChange={handleChangeFirstName}
                                                />
                                                {isSubmit && !firstName && firstName.trim() === '' && (
                                                    <p className='error'>Vui l??ng nh???p t??n</p>
                                                )}
                                            </label>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='firstname-wrapper'>
                                            <label htmlFor='lastname'>
                                                <span>Nh???p H???</span>
                                                <Input
                                                    id='lastname'
                                                    placeholder='Nh???p h???'
                                                    autoComplete='off'
                                                    value={lastName}
                                                    onChange={handleChangeLastName}
                                                />
                                                {isSubmit && !lastName && lastName.trim() === '' && (
                                                    <p className='error'>Vui l??ng nh???p h???</p>
                                                )}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>

                                <div className='password-wrapper'>
                                    <label htmlFor='password'>
                                        <span>Nh???p m???t kh???u</span>
                                        <Input
                                            id='password'
                                            type='password'
                                            placeholder='M???t kh???u l???n h??n 6 k?? t???'
                                            autoComplete='off'
                                            value={password}
                                            onChange={handleChangePassword}
                                        />
                                        {isSubmit && !password && password.trim() === '' && (
                                            <p className='error'>Vui l??ng nh???p m???t kh???u</p>
                                        )}
                                        {isSubmit && password && password.trim().length <= 6 && (
                                            <p className='error'>M???t kh???u ph???i l???n h??n 6 k?? t???</p>
                                        )}
                                    </label>
                                </div>

                                <div className='confirm-password-wrapper'>
                                    <label htmlFor='confirmpassword'>
                                        <span>X??c nh???n m???t kh???u</span>
                                        <Input
                                            id='confirmpassword'
                                            type='password'
                                            placeholder='M???t kh???u l???n h??n 6 k?? t???'
                                            autoComplete='off'
                                            value={confirmPassword}
                                            onChange={handleChangeConfirmPassword}
                                        />
                                        {isSubmit &&
                      !confirmPassword &&
                      confirmPassword.trim() === '' && (
                                            <p className='error'>Vui l??ng nh???p x??c nh???n m???t kh???u</p>
                                        )}
                                        {isSubmit &&
                      password &&
                      confirmPassword &&
                      password.trim() !== confirmPassword.trim() && (
                                            <p className='error'>
                          M???t kh???u x??c nh???n ch??a tr??ng kh???p
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className='form-policy mt--24'>
                                    <p className='policy-content'>
                    T???o t??i kho???n c?? ngh??a l?? b???n ?????ng ?? v???i{' '}
                                        <a href='/'>
                      ??i???u kho???n d???ch v???, Ch??nh s??ch quy???n ri??ng t??
                                        </a>{' '}
                    v?? C??i ?????t th??ng b??o m???c ?????nh c???a ch??ng t??i.
                                    </p>
                                    <p className='form-checkbox'>
                                        <Checkbox onChange={onChange} defaultChecked>
                      T??i mu???n nh???n th??ng tin c???p nh???t s???n ph???m v?? ??u ????i ?????c
                      bi???t
                                        </Checkbox>
                                    </p>
                                    <p className='form-checkbox'>
                                        <Checkbox onChange={onChange} defaultChecked>
                      T??i mu???n nh???n t??i li???u ????o t???o
                                        </Checkbox>
                                    </p>
                                </div>
                                <Button
                                    loading={loading}
                                    htmlType='submit'
                                    className='btn-submit'
                                    onClick={handleSubmit}
                                >
                  T???o t??i kho???n
                                </Button>
                            </form>
                        </div>
                    </div>
                )}

                {isRegisteredAccount && (
                    <div className='login-form'>
                        <div className='not-have-account d-sm-block d-none'>
                            <span>
                Ch??a c?? t??i kho???n? <Link to={PAGES.register}>????ng k??</Link>
                            </span>
                        </div>
                        <div className='logo-mobile d-sm-none d-block'>
                            <Link to={PAGES.home}>
                                <img src={BigLogo} alt='logo' />
                            </Link>
                        </div>
                        <div className='form'>
                            <h3>
                                <span>????ng nh???p</span>
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
                                                    <span>????ng nh???p b???ng Google</span>
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
                            <Divider>Ho???c</Divider>
                            <form onSubmit={handleLogin}>
                                <div className='email-wrapper'>
                                    <label htmlFor='email'>
                                        <span>Nh???p ?????a ch??? e-mail</span>
                                        <Input
                                            id='email'
                                            placeholder='Nh???p email'
                                            autoComplete='off'
                                            value={email}
                                            onChange={handleChangeEmail}
                                        />
                                        {isSubmit && !email && email.trim() === '' && (
                                            <p className='error'>Vui l??ng nh???p email</p>
                                        )}
                                        {isSubmit && email && !validateEmail(email.trim()) && (
                                            <p className='error'>
                        Vui l??ng nh???p ????ng ?????nh d???ng email
                                            </p>
                                        )}
                                    </label>
                                </div>
                                <div className='password-wrapper'>
                                    <label htmlFor='password'>
                                        <span>M???t kh???u</span>
                                        <Input
                                            id='password'
                                            type='password'
                                            placeholder='Nh???p m???t kh???u'
                                            autoComplete='off'
                                            value={password}
                                            onChange={handleChangePassword}
                                        />
                                        {isSubmit && !password && password.trim() === '' && (
                                            <p className='error'>Vui l??ng nh???p m???t kh???u</p>
                                        )}
                                    </label>
                                    <Link to={PAGES.forgotPass}>
                                        <span className='forget-password'>Qu??n m???t kh???u</span>
                                    </Link>
                                </div>
                                <Button
                                    loading={loading}
                                    htmlType='submit'
                                    className='btn-submit'
                                    onClick={handleLogin}
                                >
                  ????ng nh???p
                                </Button>
                                <div className='not-have-account mobile d-sm-none d-block'>
                                    <span>
                    Ch??a c?? t??i kho???n? <Link to={PAGES.register}>????ng k??</Link>
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
