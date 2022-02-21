import React, { useState, useRef, useEffect } from 'react';

// import inputImage from '../../../../assets/images/image.svg';
// import closeIcon from '../../../../assets/images/close-icon.svg';
import IconPost from '../../../../assets/new/common/tin-noi-bo.svg';
import IconPostActive from '../../../../assets/new/common/tin-noi-bo-active.svg';
import { Menu } from 'antd';
import './Timeline.scss';
import { useSelector } from "react-redux";
import TypeofPosts from '../../../social/components/new-post/TypeofPosts';
import DetailPosts from '../../../social/components/detail-posts/DetailPosts';


const TimeLine = (data) => {
  // type: <'post' | 'event' | 'task'>
  const [type, changeType] = useState('post');
  const detailPostsRef = useRef()
  const userInfo = useSelector(state => state.get('userProfile').get('profile'));
  // const groupType = useSelector(selectGroupType());
  const groupType = [
  ]

  const menu = (
    <Menu>
      <Menu.Item className="item-privacy" key="1">
        Công khai
      </Menu.Item>
      <Menu.Item className="item-privacy" key="2">
        Bí mật
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="new-post-container">
        <div className="type-post-wrapper"/>
        <TypeofPosts refeshData={() => detailPostsRef.current.getData()} type={type} changeType={(type) => changeType(type)} postData={{}} />
      </div>
      <DetailPosts ref={detailPostsRef} type={type} searchKey={data.searchKey} />
    </div>
  );
};

export default TimeLine;
