import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, Dropdown, Drawer, List, Divider } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { useIntl } from "react-intl";

import {
  selectUser,
  selectToken,
  selectMyLanguage,
  selectListLanguage,
} from "../../stores/global/global.selector";
import "./Header.scss";
import PAGES from "../../routes/constants";
import {
  getUser,
  logout,
  changeLanguage,
} from "../../stores/global/global.action";

import Globe from "../../assets/images/globe.svg";
import ThreeLine from "../../assets/images/three_line.svg";
import ModalSelectCompany from "../modal-select-company/ModalSelectCompany";
import DefaulAvatar from "../../assets/images/avatar_default.jpg";
import Logout from "../../assets/images/logout.svg";
import LogoutIco from "../../assets/new/header/logout.svg";
import API from '../../services/api';
import Logo from "../../assets/new/common/logo.svg";
import toaster from '../../components/toaster';
import { useCookies } from "react-cookie";
import { getListCompany } from '../../pages/home/Home.action';
import {
  selectListCompany,
} from '../../pages/home/Home.selector';

const FIXED_DOMAIN = process.env.REACT_APP_FIXED_DOMAIN;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();

  const token = useSelector(selectToken());
  const myLang = useSelector(selectMyLanguage());
  const listLang = useSelector(selectListLanguage());
  let user = useSelector(selectUser());
  const userJS = user?.toJS ? user.toJS() : user;
  const companies = useSelector(selectListCompany());

  const [isShowDrawer, setShowDrawer] = useState(false);
  const [showSelectCompany, setSelectCompany] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['company']);

  const dataMenu = [
    { title: intl.formatMessage({ id: "home.tool" }), url: "/" },
    { title: intl.formatMessage({ id: "home.price" }), url: "/" },
    { title: intl.formatMessage({ id: "home.partner" }), url: "/" },
    { title: intl.formatMessage({ id: "home.app" }), url: "/" },
    { title: intl.formatMessage({ id: "home.blog" }), url: "/" },
    { title: intl.formatMessage({ id: "home.support" }), url: "/" },
  ];

  const menu = (
    <Menu>
      {listLang
        .filter((item) => item.Code !== myLang)
        .map((item) => (
          <Menu.Item key={item.Id} onClick={() => handleChangeLang(item)}>
            <span className="uppercase">{item.Code}</span>
          </Menu.Item>
        ))}
    </Menu>
  );

  useEffect(() => {
    // if(cookies && cookies.company){
    //   let isCheck = false
    //   companies.forEach(r => {
    //     if(r.Id === cookies.company.Id){
    //       isCheck = true
    //     }
    //   })
    //   if(!isCheck){
    //     removeCookie('company')
    //   }
    // }
    if(!!!user){
      removeCookie('company')
    }
  }, [user])

  useEffect(() => {
    dispatch(getListCompany());
  }, []);

  // useEffect(() => {
  //   var hash = history.location.hash
  //   if(hash && hash.includes("ref") || !!!user || !!!cookies) {
  //     return
  //   }
  //   if(cookies && cookies.company){
  //     API.company
  //     .loginCompany({
  //       CompanyId: cookies.company.Id,
  //     })
  //     .then((rs) => {
  //       if(rs.code === 200){
  //         console.log('result', rs)
  //         window.location = `https://${rs.data.Slugname}.${FIXED_DOMAIN}${PAGES.splash}?access_token=${rs?.data?.token}`;
  //         console.log('token ne ', rs?.data)
  //         localStorage.setItem('token', rs?.data?.token)
  //       }
  //     })
  //     .catch((e) => {
  //       toaster.error(e);
  //     });
  //   }
  //   console.log('thinh ne', cookies, history.location.hash)
  // }, [history.location.hash, cookies])

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, []);

  const handleChangeLang = (data) => {
    dispatch(changeLanguage(data));
  };

  const onCloseSelectCompanyModal = () => {
    setSelectCompany(false);
  };
  const onShowSelectCompanyModal = () => {
    setSelectCompany(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDrawer(false);
    history.push(PAGES.login);
  };

  const toggleDrawer = () => {
    setShowDrawer(!isShowDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <header className={token ? "login" : ""} style={{ padding: "25px 20px" }}>
        <div className="container-fluid">
          <div className="header-wrapper d-sm-flex d-none">
            <Link to="/" className="logo">
              <img src={Logo} alt="logo" />
            </Link>
            {/* <div className="header-menu">
              <ul>
                {dataMenu.map((item, index) => (
                  <li key={index}>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="header-action">
              {!!user ? (
                <>
                  <Button
                    onClick={onShowSelectCompanyModal}
                    className="button btn-start"
                  >
                    Bắt đầu
                  </Button>
                  <div className="header-user">
                    <Dropdown
                      overlay={
                        <Menu>
                          {/* <Menu.Item key="0">
                            <a href="/">Tài khoản</a>
                          </Menu.Item> */}
                          <Menu.Item key="1" onClick={handleLogout}>
                            <div className="logoutIconCustom--wrapper">
                              <div className="logoutIconCustom">
                                <img src={LogoutIco} alt="logout" />
                              </div>
                              <div>Đăng xuất</div>
                            </div>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <div className="user-wrapper">
                        <div className="user-avatar">
                          <img
                            src={
                              userJS && userJS.Avatar
                                ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&fit=inside&image_id=${userJS.Avatar}`
                                : DefaulAvatar
                            }
                            alt="avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = DefaulAvatar;
                            }}
                          />
                        </div>
                        <div className="user-name">
                          <span>
                            {userJS
                              ? userJS.FullName || userJS.Email
                              : "Anonymous"}{" "}
                            <CaretDownOutlined />
                          </span>
                        </div>
                      </div>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <Link to={PAGES.login} className="button btn-login">
                  Đăng nhập
                </Link>
              )}
              <div className="btn-language">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div>
                    <img src={Globe} alt="globe" />
                    <span>{myLang}</span>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="header-wrapper-mobile d-sm-none d-flex">
            <div className="header-three-line" onClick={toggleDrawer}>
              <img src={ThreeLine} alt="three" />
            </div>
            <div className="logo-mobile">
              <Link to="/" className="logo">
                <h1>ABIZIN</h1>
              </Link>
            </div>
            <div className="header-action-mobile">
              {!!user ? (
                <>
                  <Button
                    onClick={onShowSelectCompanyModal}
                    className="button btn-start"
                  >
                    Bắt đầu
                  </Button>
                </>
              ) : (
                <Link to={PAGES.login} className="button btn-login">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <ModalSelectCompany
        isShow={showSelectCompany}
        onToggle={onCloseSelectCompanyModal}
      />
      <Drawer
        title={
          <div className="header-drawer">
            <CloseOutline onClick={handleCloseDrawer} />{" "}
            <Link to={PAGES.home}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>
        }
        placement="left"
        closable={false}
        onClose={handleCloseDrawer}
        visible={isShowDrawer}
        className="menu-drawer"
      >
        {!!user && (
          <div className="user-drawer">
            <div className="user-wrapper">
              <div className="user-avatar">
                <img
                  src={
                    userJS && userJS.Avatar
                      ? `https://filemanager.crmdemo.net/file/image?width=200&height=200&format=png&fit=inside&image_id=${userJS.Avatar}`
                      : DefaulAvatar
                  }
                  alt="avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaulAvatar;
                  }}
                />
              </div>
              <div className="user-name">
                <span>
                  {userJS ? userJS.FullName || userJS.Email : "Anonymous"}{" "}
                </span>
              </div>
            </div>
          </div>
        )}
        <List
          dataSource={dataMenu}
          renderItem={(item) => (
            <List.Item>
              <Link to={item.url}>
                <span>{item.title}</span>
              </Link>
            </List.Item>
          )}
        />
        <Divider />
        <div className="btn-logout" onClick={handleLogout}>
          <img src={Logout} alt="logout" />
          <span>Đăng xuất</span>
        </div>
      </Drawer>
    </>
  );
};

// const dataMenu = [
//   { title: 'Công cụ', url: '/' },
//   { title: 'Giá cả', url: '/' },
//   { title: 'Đối tác', url: '/' },
//   { title: 'Ứng dụng', url: '/' },
//   { title: 'Blog', url: '/' },
//   { title: 'Hỗ trợ', url: '/' },
// ];

// const menu = (
//   <Menu>
//     <Menu.Item key="0">
//       <a href="https://www.antgroup.com">US</a>
//     </Menu.Item>
//     <Menu.Item key="1">
//       <a href="https://www.aliyun.com">INDO</a>
//     </Menu.Item>
//   </Menu>
// );

Header.propTypes = {};

export default Header;
