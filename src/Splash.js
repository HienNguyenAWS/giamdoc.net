import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import Loading from './components/loading/Loading'
const FIXED_DOMAIN = process.env.REACT_APP_FIXED_DOMAIN
const NODE_ENV = process.env.NODE_ENV

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export function Splash() {
    const [cookies, setCookie] = useCookies(['abizin_token'])
    let query = useQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        let access_token = query.get('access_token')
        if (access_token) {
            setCookie('abizin_token', access_token)
            dispatch({
                type: 'SAVE_COMPANY_TOKEN',
                payload: {
                    token: cookies.abizin_token
                }
            })
            let url = `https://${window.location.hostname}`
            url += NODE_ENV === 'development' ? ':3000' : ''
            window.location = url
        } else {
            window.location = `https://${FIXED_DOMAIN}`
        }
    })

    return <Loading redirect />
}
