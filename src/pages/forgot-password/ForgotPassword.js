import React, { useEffect, useState } from 'react'
// import PropTypes from "prop-types";
import { Input, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft } from '@styled-icons/boxicons-regular'
import queryString from 'query-string'
import LoginLayout from '../../components/login-layout'

import BigLogo from '../../assets/new/common/logo.svg'
import { validateEmail } from '../../utils'

import PAGES from '../../routes/constants'
import { resetError } from '../../stores/global/global.action'
import { selectToken, selectError } from '../../stores/global/global.selector'
import toaster from '../../components/toaster'
import API from '../../services/api'
import { PROCESS_SUCCESS } from '../../constants/strings'
import errors from '../../constants/error'

const Login = () => {
    const dispatch = useDispatch()
    const token = useSelector(selectToken())
    const error = useSelector(selectError())
    const [isSubmit, setSubmit] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nextStep, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const query = queryString.parse(window.location.search)
    const history = useHistory()

    useEffect(() => {
        if (query.email && query.tokenVerify) {
            setStep(2)
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

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const sendEmailReset = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (email.trim() === '') {
            return
        }
        if (!validateEmail(email)) {
            return
        }
        const body = {
            email: email || ''
        }
        setLoading(true)
        API.user
            .sendEmailResetPass(body)
            .then((data) => {
                if (data?.code === 200 && data?.message === PROCESS_SUCCESS) {
                    toaster.success('???? g???i m?? x??c nh???n ?????n email')
                } else {
                    toaster.error(
                        errors[data.message] ? errors[data.message] : data.message
                    )
                }
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                toaster.error(errors[e] ? errors[e] : e)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)
        if (password.trim() === '') {
            return
        }
        const body = {
            email: query.email || '',
            tokenVerify: query.tokenVerify || '',
            password: password || ''
        }

        setLoading(true)
        API.user
            .resetPass(body)
            .then((data) => {
                if (data?.code === 200 && data?.message === PROCESS_SUCCESS) {
                    toaster.success('?????t l???i m???t kh???u th??nh c??ng')
                    history.push(PAGES.login)
                } else {
                    toaster.error(
                        errors[data.message] ? errors[data.message] : data.message
                    )
                }
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                toaster.error(errors[e] ? errors[e] : e)
            })
    }

    // const handleNextStep = (e) => {
    //   e.preventDefault();
    //   setSubmit(true);
    //   if (email.trim() === "") {
    //     return;
    //   }
    //   if (!validateEmail(email)) {
    //     return;
    //   }
    //   setSubmit(false);
    //   setStep(2);
    // };

    const handleBackStep = () => {
        setSubmit(false)
        setStep(1)
    }

    return (
        <LoginLayout>
            <div className='login-form'>
                <div className='not-have-account d-sm-block d-none'>
                    {nextStep === 2 && (
                        <div className='btn-back-wrapper'>
                            <Button className='btn-back' onClick={handleBackStep}>
                                <ChevronLeft />
                            </Button>
                        </div>
                    )}
                    <span>
            Ch??a c?? t??i kho???n? <Link to={PAGES.register}>????ng k??</Link>
                    </span>
                </div>
                <div className='logo-mobile d-sm-none d-block'>
                    <Link to={PAGES.home}>
                        <img src={BigLogo} alt='logo' />
                    </Link>
                    {nextStep === 2 && (
                        <div className='btn-back-wrapper'>
                            <Button className='btn-back' onClick={handleBackStep}>
                                <ChevronLeft />
                                <span>Quay l???i</span>
                            </Button>
                        </div>
                    )}
                </div>

                <div className={nextStep === 2 ? 'form reset-pass' : 'form fill-email'}>
                    <h3 className='forgot'>
                        <span>
                            {nextStep === 1 ? 'Qu??n m???t kh???u?' : '?????t l???i m???t kh???u c???a b???n'}
                        </span>
                    </h3>
                    {nextStep === 1 && (
                        <div className='description'>
                            <p>
                Nh???p ?????a ch??? email b???n ???? s??? d???ng khi tham gia v?? ch??ng t??i s???
                g???i cho b???n h?????ng d???n ????? ?????t l???i m???t kh???u c???a b???n.
                            </p>
                            <p>
                V?? l?? do b???o m???t, ch??ng t??i KH??NG l??u tr??? m???t kh???u c???a b???n. V??
                v???y, h??y y??n t??m r???ng ch??ng t??i s??? kh??ng bao gi??? g???i m???t kh???u
                c???a b???n qua email.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {nextStep === 1 && (
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
                        )}

                        {nextStep === 2 && (
                            <div className='password-wrapper'>
                                <label htmlFor='password'>
                                    <span>M???t kh???u m???i</span>
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
                    password.trim().length < 6 && (
                                        <p className='error'>
                        Vui l??ng nh???p m???t kh???u l???n h??n 6 k?? t???
                                        </p>
                                    )}
                                </label>
                            </div>
                        )}

                        <Button
                            loading={loading}
                            htmlType='submit'
                            className='btn-submit'
                            onClick={nextStep === 1 ? sendEmailReset : handleSubmit}
                        >
                            {nextStep === 1 ? 'G???i h?????ng d???n ?????t l???i' : '?????t l???i m???t kh???u'}
                        </Button>
                    </form>
                </div>
                <div className='not-have-account mobile d-sm-none d-block'>
                    <span>
            Ch??a c?? t??i kho???n? <Link to={PAGES.register}>????ng k??</Link>
                    </span>
                </div>
            </div>
        </LoginLayout>
    )
}

Login.propTypes = {}

export default Login
