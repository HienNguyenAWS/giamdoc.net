import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { HeadData as data } from 'pages/pay-grades/initialize-data/_head'
import {
    PAY_GRADES_TEMPLATE_ONE,
    PAY_GRADES_TEMPLATE_TWO,
    PAY_GRADES_TEMPLATE_THREE,
    PAY_GRADES_TEMPLATE_ONE_TITLE,
    PAY_GRADES_TEMPLATE_TWO_TITLE,
    PAY_GRADES_TEMPLATE_THREE_TITLE,
    PAY_GRADES_TEMPLATE_LIST_TITLE
} from 'constants/constants'

import './HeaderBar.scss'

import Tab from './Tab'
import HeaderPage from 'components/header-page/HeaderPage'

const HeaderBar = () => {
    const [tabs, setTabs] = useState([])
    const [title, setTitle] = useState('')
    const [currentWidth, setCurrentWidth] = useState(1200)

    const ref = useRef(null)

    const { id } = useParams()

    useEffect(() => {
        const tabData = data.tabs

        if (tabData) {
            setTabs(tabData)
        }
    }, [])

    const menu = (
        <Menu>
            {tabs.slice(6, 8).map((tab, index) => (
                <Menu.Item key={index}>
                    <a href="#">{tab.label}</a>
                </Menu.Item>
            ))}
        </Menu>
    )

    useEffect(() => {
        setCurrentWidth(ref.current.offsetWidth)

        if (id == PAY_GRADES_TEMPLATE_ONE) {
            setTitle(PAY_GRADES_TEMPLATE_ONE_TITLE)
        } else if (id == PAY_GRADES_TEMPLATE_TWO) {
            setTitle(PAY_GRADES_TEMPLATE_TWO_TITLE)
        } else if (id == PAY_GRADES_TEMPLATE_THREE) {
            setTitle(PAY_GRADES_TEMPLATE_THREE_TITLE)
        } else {
            setTitle(PAY_GRADES_TEMPLATE_LIST_TITLE)
        }
    }, [id])

    return (
        <div className="topnav" ref={ref}>
            <HeaderPage title={title} />
            <div className="bottom">
                {currentWidth > 1500 ? (
                    <ul className="tabs">
                        {tabs.map((tab, index) => <Tab key={index} tab={tab} />)}
                    </ul>
                ) : (
                    <ul className="tabs">
                        {tabs.slice(0, 6).map((tab, index) => <Tab key={index} tab={tab} />)}
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default HeaderBar