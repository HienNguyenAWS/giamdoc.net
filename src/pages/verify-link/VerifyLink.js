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
                                <span>????ng k?? trong C??ng ty {infoInvitation?.Fullname}</span>
                            </h3>
                            <p className='subtitle mb--24'>
                B???n ???? ???????c m???i tham gia ABIZIN t??? bangnc.hn@gmail.com. Vui l??ng
                t???o m???t m???t kh???u ????? ho??n t???t ????ng k??.
                            </p>
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
                                            <p className='error'>
                        Vui l??ng nh???p ????ng ?????nh d???ng email
                                            </p>
                                        )}
                                    </label>
                                </div>

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
                                <div className='password-wrapper mt--24'>
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
            </LoginLayout>
        </>
    )
}

VerifyInvite.propTypes = {}

export default VerifyInvite
