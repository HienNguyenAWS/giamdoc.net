import React, { useEffect, useState } from 'react'
import { HeadData as data } from 'pages/pay-grades/initialize-data/_head'
import Icon from 'assets/images/glones'
import './HeaderPage.scss'

import Menu from './Menu'

const HeaderPage = ({ title }) => {
    const [menus, setMenu] = useState([])

    useEffect(() => {
        const menuData = data.menus

        if (menuData) {
            setMenu(menuData)
        }
    }, [])

    return (
        <div className="top">
            <h3 className="title">{title}</h3>
            <ul className="menus">
                {menus.map((menu, index) => <Menu key={index} menu={menu} />)}
                <li className="menu-item">
                    <Icon name="MoreIcon"/>
                </li>
            </ul>
        </div>
    )
}

export default HeaderPage