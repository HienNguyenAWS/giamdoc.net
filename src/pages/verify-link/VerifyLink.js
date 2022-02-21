import React, { useEffect, useState, useRef } from 'react'
import { Input, Button, Row, Col, Checkbox } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetError } from '../../stores/global/global.action'
import { selectError, selectToken } from '../../stores/global/global.selector'
import LoginLayout from '../../components/login-layout'

import BigLogo from '../../assets/new/common/logo.svg'

import PAGES from '../../routes/constants'
import toaster from '../../components/toaster'
import LoadingScreen from '../../components/loading/Loading'
import API from '../../services/api'
import errors from '../../constants/error'
import { PROCESS_SUCCESS } from '../../constants/strings'
import { validateEmail } from '../../utils'

const FIXED_DOMAIN = process.env.REACT_APP_FIXED_DOMAIN

const VerifyInvite = () => {
    const dispatch = useDispatch()
    const error = useSelector(selectError())
    const token = useSelector(selectToken())
    const companyId = useRef()
    const haveError = useRef(false)

    const [isSubmit, setSubmit] = useState(false)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [infoInvitation, setInfoInvitation] = useState({})
    const [isShowForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingCompany, setLoadingCompany] = useState(false)

    const query = queryString.parse(window.location.search)
    const history = useHistory()

    useEffect(() => {
        handleVerify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleVerify = async () => {
        if (!query.inviteCode) {
            history.push('/')
        }

        try {
            setLoadingCompany(true)
            const result = await API.company.verifyLink({
                inviteCode: query.inviteCode
            })

            if (result?.code === 200) {
                setInfoInvitation(result?.data || {})

                if (result?.data?.Id) {
                    companyId.current = +result?.data?.Id || 0

                    try {
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
            } else {
                setShowForm(false)
                haveError.current = true
                toaster.error(
                    errors[result?.message] ? errors[result?.message] : result?.message
                )
            }
        } catch (e) {
            setLoadingCompany(false)
            setShowForm(true)
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
      confirmPassword.trim() === '' ||
      email.trim() === ''
        ) {
            return
        }

        if (!validateEmail(email)) {
            return
        }

        try {
            setLoading(true)
            const result = await API.company.confirmLink({
                inviteCode: query.inviteCode,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            })

            if (result?.code === 200 && result?.message === PROCESS_SUCCESS) {
                companyId.current = +result?.data?.Id || 0
                const body = {
                    userName: email || '',
                    passWord: password || '',
                    type: 3
                }
                dispatch(login(body))
            } else {
                toaster.error(errors[result?.message])
            }
        } catch (e) {
            console.log('error', e)
        } finally {
            setLoading(false)
        }
    }

    const onChange = () => {}

    useEffect(() => {
        if (token && !haveError.current && isSubmit) {
            try {
                setLoadingCompany(true)
                API.company
                    .loginCompany({
                        CompanyId: companyId.current
                    })
                    .then((res) => {
                        if (res.code === 200) {
                            window.location = `https://${res?.data?.Slugname}.${FIXED_DOMAIN}${PAGES.splash}?access_token=${res?.data?.token}`
                        }
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
                                <span>Đăng ký trong Công ty {infoInvitation?.Fullname}</span>
                            </h3>
                            <p className='subtitle mb--24'>
                Bạn đã được mời tham gia ABIZIN từ bangnc.hn@gmail.com. Vui lòng
                tạo một mật khẩu để hoàn tất đăng ký.
                            </p>
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
                                            <p className='error'>
                        Vui lòng nhập đúng định dạng email
                                            </p>
                                        )}
                                    </label>
                                </div>

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
                                <div className='password-wrapper mt--24'>
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
            </LoginLayout>
        </>
    )
}

VerifyInvite.propTypes = {}

export default VerifyInvite
