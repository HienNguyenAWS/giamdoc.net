/* eslint-disable react/prop-types */
import React from 'react';
import './UserIntroduce.scss';
import workIcon from '../../../../assets/images/work-icon.svg';
import homeIcon from '../../../../assets/images/home-icon.svg';
// import location2Icon from '../../../../assets/images/location2-icon.svg';
import messageIcon from '../../../../assets/images/message-icon.svg';
import FormatText2 from '../../../../utils/FormatText2';

const UserIntroduce = ({ userInfo }) => {
  return (
    <div className="user-introduce">
      <p>
        {userInfo.Info ? <FormatText2 text={userInfo.Info} /> : 'chưa thêm info'}
      </p>

      <div className="info-list">
        <div>
          <img src={workIcon} alt="work" />
          <p> {userInfo.JobTitle ? `Công việc ${userInfo.JobTitle}` : 'chưa thêm địa chỉ làm việc'}</p>
        </div>
        <div>
          <img src={homeIcon} alt="home" />
          <p>{userInfo.Address ? `Sống tại ${userInfo.Address}` : 'chưa thêm địa chỉ nhà'}</p>
        </div>
        {/* <div>
          <img src={location2Icon} alt="location" />
          <p>{userInfo.Address ? `Làm việc tại ${userInfo.Address}` : 'chưa thêm address'}</p>
        </div> */}
        <div>
          <img src={messageIcon} alt="mail" />
          <p>{userInfo.Email || 'chưa thêm email'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserIntroduce;
