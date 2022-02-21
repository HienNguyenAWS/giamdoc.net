import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie'
import 'dotenv/config'

import { Routes } from 'routes'
import reportWebVitals from 'reportWebVitals'
import 'styles/global.scss'

import configureStore from 'stores/configureStore'
import rootSaga from 'sagas'
import SocketService from 'services/socket/SocketService'
import { URI } from 'constants/config'
import { LoadScript } from '@react-google-maps/api'

const store = configureStore()
store.runSaga(rootSaga)

const history = createBrowserHistory({
    // basename: '/hrm'
})

ReactDOM.render(
    <LoadScript googleMapsApiKey="AIzaSyCE4XWFXoI0GExPw-j4bPModjV7Qtic9uc">
        <Provider store={store}>
            <CookiesProvider>
                <SocketService uri={URI}>
                    <Router history={history}>
                        <Routes />
                        <ToastContainer />
                    </Router>
                </SocketService>
            </CookiesProvider>
        </Provider>
    </LoadScript>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
