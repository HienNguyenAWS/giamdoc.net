import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import avatar from '../../../../assets/images/avatar_default.jpg';
import IconPublic from '../../../../assets/images/public_privacy.svg';
// import inputImage from '../../../../assets/images/image.svg';
// import closeIcon from '../../../../assets/images/close-icon.svg';
import IconPost from '../../../../assets/new/common/tin-noi-bo.svg';
import IconPostActive from '../../../../assets/new/common/tin-noi-bo-active.svg';
import IconSurvey from '../../../../assets/new/common/khao-sat.svg';
import IconSurveyActive from '../../../../assets/new/common/khao-sat-active.svg';
import IconEvent from '../../../../assets/new/common/hop-su-kien.svg';
import IconEventActive from '../../../../assets/new/common/hop-su-kien-active.svg';
import { Row, Col, Tooltip, Dropdown, Menu, Spin } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './UserTasks.scss';
import { clearData, getListPosts } from '../../../../stores/posts/posts.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectListPosts } from '../../../../stores/posts/posts.selector';
import { getUrlImage } from '../../../../utils';
import { useCookies } from 'react-cookie';
import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
import DetailPosts from '../../../social/components/detail-posts/DetailPosts';
import { saveToken } from '../../../../stores/global/global.action';
import NoData from '../../../../assets/new/common/no-data.svg';
import { useLocation } from 'react-router-dom';
const UserTasks = (data) => {
  // type: <'post' | 'event' | 'task'>
  const [type, changeType] = useState('task');
  return (
    <div>
      <div className="new-post-container">
        <div className="tabs-wrapper">
          <div className="type-post-wrapper">
          </div>
        </div>
        <TypeofPosts type={type} changeType={(type) => changeType(type)} postData={{}} />
      </div>
      <DetailPosts  type='vote' searchKey={data.searchKey} />
    </div>
  );
};

export default UserTasks;
