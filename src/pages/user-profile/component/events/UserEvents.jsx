import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { clearData, getListPosts } from '../../../../stores/posts/posts.action';
import { selectListPosts } from '../../../../stores/posts/posts.selector';
import { useHistory } from 'react-router-dom';
import avatar from '../../../../assets/images/avatar_default.jpg';
import IconPublic from '../../../../assets/images/public_privacy.svg';
import noData from "../../../../assets/images/no-data.svg";
// import inputImage from '../../../../assets/images/image.svg';
// import closeIcon from '../../../../assets/images/close-icon.svg';
import IconPost from '../../../../assets/new/common/tin-noi-bo.svg';
import IconPostActive from '../../../../assets/new/common/tin-noi-bo-active.svg';
import IconSurvey from '../../../../assets/new/common/khao-sat.svg';
import IconSurveyActive from '../../../../assets/new/common/khao-sat-active.svg';
import IconEvent from '../../../../assets/new/common/hop-su-kien.svg';
import IconEventActive from '../../../../assets/new/common/hop-su-kien-active.svg';
import { Spin, Col, Tooltip, Dropdown, Menu, Avatar } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './UserEvents.scss';
import { getUrlImage } from '../../../../utils';
import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
import DetailEvent from '../../../social/components/detail-posts/event/DetailEvent';
import { useCookies } from 'react-cookie';
import { saveToken } from '../../../../stores/global/global.action';
import NoData from '../../../../assets/new/common/no-data.svg';
const UserEvents = (data) => {
  // type: <'post' | 'event' | 'task'>
  const [type, changeType] = useState('event');
  const userInfo = useSelector(state => state.get('userProfile').get('profile'));
  const isLoadMore = useSelector((state) => state.get('posts').isLoadMore);
  const isLoading = useSelector((state) => state.get('posts').loading);
  const [cookies] = useCookies(['abizin_token']);
  const groupType = []
  const dispatch = useDispatch();
  const posts = useSelector(selectListPosts);
  const history = useHistory();
  const [offset, setOffset] = useState(1);


  const handleGetListOfPosts = () => {
    let payload = {};
    if (location.pathname === '/profile') {
      payload = {
        groupId: 0,
        index: offset,
        pageSize: 5,
        type: 3,
        key: data.searchKey,
        inProfile: true,
      };
    } else {
      payload = { groupId: 0, index: offset, pageSize: 5, type: 3 };
    }
    dispatch(getListPosts(payload));
    setOffset(offset + 1);
  };
  const handle_scroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom + 10 >= docHeight) {
      if (isLoadMore) {
        handleGetListOfPosts();
      }
    } else {
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handle_scroll);
    return () => window.removeEventListener('scroll', handle_scroll);
  }, [posts.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(saveToken(cookies.abizin_token));
    let payload = {};
    if (location.pathname === '/profile') {
      payload = { groupId: 0, index: 1, pageSize: 5, type: 3, key: data.searchKey, inProfile: true };
    } else {
      payload = { groupId: 0, index: 1, pageSize: 5, type: 3 };
    }
    
    setTimeout(function(){ 
      dispatch(getListPosts(payload));
      setOffset(1);
    }, 200);

    return () => {
      dispatch(clearData());
    };
  }, [location.key, data.searchKey]);



  return (
    <>
      <div className="new-post-container">
        {/* <div className="tabs-wrapper">
          <div className="type-post-wrapperx">
          <div className="type-post-wrapperx" style={{ paddingRight: 15 }}>
            <div
              className={`type-post-tab selected`}  style={{ border: 'none' }}  
            >
              <img className="type-post-img" src={type === 'event' ? IconEventActive : IconEvent} style={{ marginRight: 8 }} />
              Họp/Sự kiện
            </div>
          </div>
          </div>
          </div> */}
        <TypeofPosts refeshData={() => { }} type={type} changeType={(type) => changeType(type)} postData={{}} />
      </div>
      <>
        {isLoading && posts.length === 0 ? (
          <Spin size='large' />
        ) : (
          <>
            {posts.length === 0 ? (
              <div className='no-task'>
                <img src={NoData} alt='noTask' />
                <p style={{ color: '#414346' }}>Chưa có sự kiện nào</p>
              </div>
            ) : (
              <div>
                {posts.map((post, index) => (
                  <div key={index}>
                    <DetailEvent data={post} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};

export default UserEvents;
