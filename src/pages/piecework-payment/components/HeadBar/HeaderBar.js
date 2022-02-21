import React, { useEffect, useState } from 'react'
import { HeadData as data } from 'pages/pay-grades/initialize-data/_head'
import './HeaderBar.scss'
import Tab from './Tab'
import HeaderPage from 'components/header-page/HeaderPage'

const HeaderBar = () => {
    const [tabs, setTabs] = useState([])
    const title = 'Đơn giá lương khoán sản phẩm'

    useEffect(() => {
        const tabData = data.tabs

        if (tabData) {
            setTabs(tabData)
        }
    }, [])

    return (
        <div className="topnav">
            <HeaderPage title={title} />
            <div className="bottom">
                <ul className="tabs">
                    {tabs.map((tab, index) => <Tab key={index} tab={tab} />)}
                </ul>
            </div>
        </div>
    )
}

export default HeaderBar