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
                    toaster.success('Đã gửi mã xác nhận đến email')
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
                    toaster.success('Đặt lại mật khẩu thành công')
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
            Chưa có tài khoản? <Link to={PAGES.register}>Đăng ký</Link>
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
                                <span>Quay lại</span>
                            </Button>
                        </div>
                    )}
                </div>

                <div className={nextStep === 2 ? 'form reset-pass' : 'form fill-email'}>
                    <h3 className='forgot'>
                        <span>
                            {nextStep === 1 ? 'Quên mật khẩu?' : 'Đặt lại mật khẩu của bạn'}
                        </span>
                    </h3>
                    {nextStep === 1 && (
                        <div className='description'>
                            <p>
                Nhập địa chỉ email bạn đã sử dụng khi tham gia và chúng tôi sẽ
                gửi cho bạn hướng dẫn để đặt lại mật khẩu của bạn.
                            </p>
                            <p>
                Vì lý do bảo mật, chúng tôi KHÔNG lưu trữ mật khẩu của bạn. Vì
                vậy, hãy yên tâm rằng chúng tôi sẽ không bao giờ gửi mật khẩu
                của bạn qua email.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {nextStep === 1 && (
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
                        )}

                        {nextStep === 2 && (
                            <div className='password-wrapper'>
                                <label htmlFor='password'>
                                    <span>Mật khẩu mới</span>
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
                    password.trim().length < 6 && (
                                        <p className='error'>
                        Vui lòng nhập mật khẩu lớn hơn 6 ký tự
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
                            {nextStep === 1 ? 'Gửi hướng dẫn đặt lại' : 'Đặt lại mật khẩu'}
                        </Button>
                    </form>
                </div>
                <div className='not-have-account mobile d-sm-none d-block'>
                    <span>
            Chưa có tài khoản? <Link to={PAGES.register}>Đăng ký</Link>
                    </span>
                </div>
            </div>
        </LoginLayout>
    )
}

Login.propTypes = {}

export default Login
