/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Dropdown, Input, Tooltip, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons'

import './HeaderMain.scss'
import PAGES from '../../routes/constants'
import ChatIcon from '../../assets/new/header/chat-icon.svg'

import QAIcon from '../../assets/new/header/qa-icon.svg'
import InviteIcon from '../../assets/new/header/invite-icon.svg'
import SearchIcon from '../../assets/new/header/search-icon.svg'
import Search from '../../assets/new/common/tim-kiem.svg'

import Logo2 from '../../assets/new/side-bar/logo2.png'


import {
    logout
    // saveToken,
} from '../../stores/global/global.action'
import AvatarCustom from '../avatar-custom'

const HeaderMain = () => {
    const [searchText, setSearchText] = useState([])
    const [countChart, setCountChat] = useState(0)
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const directToMessagePage = () => {
        dispatch(setCountChat(0))
        history.push(PAGES.messagesBox)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!searchText) return
            history.push(`/search-page?q=${searchText.trim()}`)
        } else {
            return
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        history.push(PAGES.login)
    }

    return (
        <header className='header-social'>
            <div className='header-search'>
                <img src={Logo2} style={{ width: '28px' }} />
                <p className="name">Tên công ty TNHH Balo Việt</p>
                {/* <div className="line"></div>
        <p className="title">Giải pháp phần mềm danh nghiệp</p> */}
            </div>
            <div className="header-info">
                <div className="header-info--item">
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key='0'>
                                    <Link to={PAGES.profile}>
                                        <div className='info-account'>
                                            <AvatarCustom
                                                src={null}
                                                size={32}
                                                fullName={'Anonymous'}
                                            />
                                            <div>
                                                <div className='name-account'>{'Anonymous'}</div>
                                                <div className='note-account'>Thông tin tài khoản</div>
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='1'>
                                    <Link to={PAGES.setting}>
                                        <div className='item-select'>
                                            <SettingOutlined />
                                            <div className='item-name'>Cài đặt</div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='2' onClick={handleLogout}>
                                    <div className='item-select'>
                                        <LogoutOutlined />
                                        <div className='item-name'>Đăng xuất</div>
                                    </div>
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                        overlayClassName='header--account'
                    >
                        <Space size={10} className='cursor--pointer'>
                            <AvatarCustom
                                src={null}
                                size={32}
                                fullName={'Anonymous'}
                            />
                        </Space>
                    </Dropdown>
                </div>
                <Tooltip placement='bottom' title="Tin nhắn">
                    <div className="header-info--item" onClick={directToMessagePage}>
                        <img src={ChatIcon} />
                    </div>
                </Tooltip>
                {/* <Tooltip placement='bottom' title="Activity" style={{ width: '79px' }}>
          <div className="header-info--item">
            <img src={ActivityIcon} />
          </div>
        </Tooltip> */}
                <div className="header-info--item">
                    <img src={QAIcon} />
                </div>
                <div className="header-info--item">
                    <img src={InviteIcon} />
                </div>
                {showSearch
                    ? <Input
                        className="search-type__left--search"
                        size='small'
                        placeholder='Search'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        suffix={<img src={Search} />}
                        onKeyDown={handleKeyDown}
                    />
                    : <div className="header-info--item">
                        <img src={SearchIcon} onClick={() => setShowSearch(true)} />
                    </div>
                }
            </div>
            {/* <div className="expand-icon">
        <img src={ExpandIcon} onClick={() => expandCollapse()} />
      </div> */}
        </header>
    )
}

HeaderMain.propTypes = {}

export default HeaderMain
