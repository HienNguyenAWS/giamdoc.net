import { Divider, Image, Tooltip } from 'antd'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LogoMini from '../../assets/new/common/logo-mini.png'
import Logo from '../../assets/new/common/logo.png'
import AppIcon from '../../assets/new/side-bar/app.svg'
import BankActiveIcon from '../../assets/new/side-bar/bank-active.svg'
import BankIcon from '../../assets/new/side-bar/bank.svg'
import DashbroadActiveIcon from '../../assets/new/side-bar/dashbroad-active.svg'
import DashbroadIcon from '../../assets/new/side-bar/dashbroad.svg'
import DropboxIcon from '../../assets/new/side-bar/dropbox-icon.svg'
import EmailIcon from '../../assets/new/side-bar/email-icon.svg'
import ExitIcon from '../../assets/new/side-bar/exit-icon.png'
import LanguageIcon from '../../assets/new/side-bar/language-icon.svg'
import MediaActiveIcon from '../../assets/new/side-bar/media-active.svg'
import MediaIcon from '../../assets/new/side-bar/media.svg'
import SettingIcon from '../../assets/new/side-bar/setting-icon.svg'
import { useSidebarModules } from '../../hooks'
import { setExpandCollapseSideBarLeft, setExpandCollapseSideBarRight } from '../../stores/global/global.action'
import SidebarRight from './SidebarRight.js'
import './styles.scss'

const SideBar = ({ title = '' }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // const [collapseLevel1, setCollapseLevel1] = useState(false);
    // const [collapseLevel2, setCollapseLevel2] = useState(false);
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    const { SidebarModules } = useSidebarModules()

    const [sidebarActive, setSidebarActive] = useState(SidebarModules.HRM)

    const handlesidebarActiveChange = (newSidebarActive) => {
        setSidebarActive(newSidebarActive)
    }

    const gotoLink = () => {
        history.push('/')
        location.reload()
    }

    const expandLeft = () => {
        dispatch(setExpandCollapseSideBarLeft(!collapseLeft))
    }

    const expandRight = () => {
        dispatch(setExpandCollapseSideBarRight(!collapseRight))
    }

    // useEffect(() => {
    //     if (collapseLeft && collapseRight) {
    //         setCollapseLevel1(true);
    //         setCollapseLevel2(true);
    //     } else if (collapseLeft || collapseRight) {
    //         setCollapseLevel1(true);
    //         setCollapseLevel2(false);
    //     } else {
    //         setCollapseLevel1(false);
    //         setCollapseLevel2(false);
    //     }
    // }, [collapseLeft, collapseRight]);

    return (
        <div className="sidebar">
            <div className="sidebar--layout">
                <div className={`sidebar--layout__left ${collapseLeft ? 'collapsed' : ''}`}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className={`name-module ${collapseLeft && 'center'}`}>
                            <p style={collapseLeft ? { display: 'none' } : {}}>CHỌN MODULE</p>
                            <img src={collapseLeft ? AppIcon : ExitIcon} style={{ width: 25 }} onClick={expandLeft} />
                        </div>
                        {collapseLeft ? (
                            <>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.Media)}
                                    className={clsx('module center', {
                                        active: sidebarActive === SidebarModules.Media
                                    })}
                                >
                                    <Tooltip placement="right" title={SidebarModules.Media}>
                                        <img
                                            src={sidebarActive === SidebarModules.Media ? MediaActiveIcon : MediaIcon}
                                            width={24}
                                            height={24}
                                        />
                                    </Tooltip>
                                </div>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.HRM)}
                                    className={clsx('module center', {
                                        active: sidebarActive === SidebarModules.HRM
                                    })}
                                >
                                    <Tooltip placement="right" title={SidebarModules.HRM}>
                                        <img
                                            src={sidebarActive === SidebarModules.HRM ? DashbroadActiveIcon : DashbroadIcon}
                                            width={24}
                                            height={24}
                                        />
                                    </Tooltip>
                                </div>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.Finance)}
                                    className={clsx('module center', {
                                        active: sidebarActive === SidebarModules.Finance
                                    })}
                                >
                                    <Tooltip placement="right" title={SidebarModules.Finance}>
                                        <img
                                            src={sidebarActive === SidebarModules.Finance ? BankActiveIcon : BankIcon}
                                            width={24}
                                            height={24}
                                        />
                                    </Tooltip>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.Media)}
                                    className={clsx('module', {
                                        active: sidebarActive === SidebarModules.Media
                                    })}
                                >
                                    <img
                                        className="logo"
                                        src={sidebarActive === SidebarModules.Media ? MediaActiveIcon : MediaIcon}
                                        width={24}
                                        height={24}
                                    />
                                    <div
                                        className={clsx('title', {
                                            active: sidebarActive === SidebarModules.Media
                                        })}
                                    >
                                        {SidebarModules.Media}
                                    </div>
                                </div>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.HRM)}
                                    className={clsx('module', {
                                        active: sidebarActive === SidebarModules.HRM
                                    })}
                                >
                                    <img
                                        className="logo"
                                        src={sidebarActive === SidebarModules.HRM ? DashbroadActiveIcon : DashbroadIcon}
                                        width={24}
                                        height={24}
                                    />
                                    <div
                                        className={clsx('title', {
                                            active: sidebarActive === SidebarModules.HRM
                                        })}
                                    >
                                        {SidebarModules.HRM}
                                    </div>
                                </div>
                                <div
                                    onClick={() => handlesidebarActiveChange(SidebarModules.Finance)}
                                    className={clsx('module', {
                                        active: sidebarActive === SidebarModules.Finance
                                    })}
                                >
                                    <img
                                        className="logo"
                                        src={sidebarActive === SidebarModules.Finance ? BankActiveIcon : BankIcon}
                                        width={24}
                                        height={24}
                                    />
                                    <div
                                        className={clsx('title', {
                                            active: sidebarActive === SidebarModules.Finance
                                        })}
                                    >
                                        {SidebarModules.Finance}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="sidebar--layout__left--bottom">
                        <div className={`sidebar--layout__left--bottom-icon ${collapseLeft && 'center'}`}>
                            <Tooltip placement="right" title="Ngôn ngữ">
                                <img src={LanguageIcon} width={24} height={24} />
                            </Tooltip>
                            {!collapseLeft && <div className="sidebar--layout__left--bottom-icon-title">Thiết lập ngôn ngữ</div>}
                        </div>
                        <div className={`sidebar--layout__left--bottom-icon ${collapseLeft && 'center'}`}>
                            <Tooltip placement="right" title="Cloud">
                                <img src={DropboxIcon} width={24} height={24} />
                            </Tooltip>
                            {!collapseLeft && <div className="sidebar--layout__left--bottom-icon-title">Cloud</div>}
                        </div>
                        <div className={`sidebar--layout__left--bottom-icon ${collapseLeft && 'center'}`}>
                            <Tooltip placement="right" title="Email">
                                <img src={EmailIcon} width={24} height={24} />
                            </Tooltip>
                            {!collapseLeft && <div className="sidebar--layout__left--bottom-icon-title">Email</div>}
                        </div>
                        <div className={`sidebar--layout__left--bottom-icon ${collapseLeft && 'center'}`}>
                            <Tooltip placement="right" title="Settings">
                                <img src={SettingIcon} width={24} height={24} />
                            </Tooltip>
                            {!collapseLeft && <div className="sidebar--layout__left--bottom-icon-title">Cài đặt</div>}
                        </div>
                        <Divider style={{ margin: 0, width: '100%' }} />
                        <div className="sidebar--layout__left--bottom-logo center">
                            {collapseLeft ? <Image src={LogoMini} preview={false} /> : <Image src={Logo} preview={false} />}
                        </div>
                    </div>
                </div>

                <div
                    className={`sidebar--layout__right ${collapseRight ? 'collapsed' : ''} ${
                        collapseLeft ? 'left-collapsed' : ''
                    }`}
                >
                    <div>
                        <div
                            className="sidebar--layout__right--title"
                            style={collapseRight ? { marginRight: 0, marginLeft: 0, justifyContent: 'center' } : {}}
                        >
                            <span style={collapseRight ? { display: 'none' } : {}} onClick={() => gotoLink()}>
                                {title}
                            </span>
                        </div>
                        <SidebarRight sidebarActive={sidebarActive} />
                    </div>
                </div>

                <div className={`exit-icon ${collapseRight ? 'rotate-180' : ''}`} onClick={expandRight} style={{ width: 25 }}>
                    <img src={ExitIcon} />
                </div>
            </div>
        </div>
    )
}

SideBar.propTypes = {
    title: PropTypes.string,
    isExpand: PropTypes.bool,
    setIsExpand: PropTypes.Function
}

export default SideBar
