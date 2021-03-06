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
                        <span>????ng k??</span>
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
                                            <span>????ng k?? b???ng Google</span>
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
                    <div className='divider'>Ho???c</div>
                    <form onSubmit={handleSubmit}>
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
                                    <p className='error'>Vui l??ng nh???p ????ng ?????nh d???ng email</p>
                                )}
                            </label>
                        </div>
                        <Row gutter={[16, 32]} className='email-wrapper'>
                            <Col span={12}>
                                <span className="title">Nh???p T??n</span>
                                <Input
                                    placeholder='Nh???p t??n'
                                    autoComplete='off'
                                    value={lastName}
                                    onChange={handleChangeLastName}
                                />
                                {isSubmit && !lastName && lastName.trim() === '' && (
                                    <p className='error'>Vui l??ng nh???p t??n</p>
                                )}
                            </Col>
                            <Col span={12}>
                                <span className="title">Nh???p H???</span>
                                <Input
                                    placeholder='Nh???p h???'
                                    autoComplete='off'
                                    value={firstName}
                                    onChange={handleChangeFirstName}
                                />
                                {isSubmit && !firstName && firstName.trim() === '' && (
                                    <p className='error'>Vui l??ng nh???p h???</p>
                                )}
                            </Col>
                        </Row>
                        <div className='password-wrapper'>
                            <label htmlFor='password'>
                                <span>M???t kh???u</span>
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
                                {isSubmit &&
                  password.trim() !== '' &&
                  password.trim().length <= 6 && (
                                    <p className='error'>
                      Vui l??ng nh???p m???t kh???u l???n h??n 6 k?? t???
                                    </p>
                                )}
                            </label>
                        </div>
                        <div className='form-policy'>
                            <p className='policy-content'>
                T???o t??i kho???n c?? ngh??a l?? b???n ?????ng ?? v???i{' '}
                                <a href='/'>??i???u kho???n d???ch v???, Ch??nh s??ch quy???n ri??ng t??</a> v??
                C??i ?????t th??ng b??o m???c ?????nh c???a ch??ng t??i.
                            </p>
                            <p className='form-checkbox'>
                                <Checkbox onChange={onChange} defaultChecked>
                  T??i mu???n nh???n th??ng tin c???p nh???t s???n ph???m v?? ??u ????i ?????c bi???t
                                </Checkbox>
                            </p>
                            <p className='form-checkbox'>
                                <Checkbox onChange={onChange} defaultChecked>
                  T??i mu???n nh???n t??i li???u ????o t???o
                                </Checkbox>
                            </p>
                        </div>
                        <Button
                            htmlType='submit'
                            className='btn-submit'
                            loading={loading}
                            onClick={handleSubmit}
                        >
              ????ng k??
                        </Button>
                        <div className='not-have-account mobile d-sm-none d-block'>
                            <span>
                ???? c?? t??i kho???n? <Link to={PAGES.login}>????ng nh???p</Link>
                            </span>
                        </div>
                    </form>
                    <div className='copyright'>
                        <p>
              Website n??y ???????c b???o v??? b???i reCAPTCHA v?? ??p d???ng Ch??nh s??ch Quy???n
              Ri??ng t?? v?? ??i???u kho???n D???ch v??? c???a Google
                        </p>
                    </div>
                </div>
            </div>
        </LoginLayout>
    )
}

Register.propTypes = {}

export default Register
