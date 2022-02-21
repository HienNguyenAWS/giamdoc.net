/* eslint-disable react/prop-types */
import React from 'react';
import './UserInfoCard.scss';
import { Row, Col, Tooltip } from 'antd'
import avatar from '../../../../assets/images/avatar.svg';
import workIcon from '../../../../assets/new/profile/work.svg';
import homeIcon from '../../../../assets/new/profile/place.svg';
import zalo from '../../../../assets/new/profile/zalo.svg';
import phone from '../../../../assets/new/profile/phone.svg';
import cameraIcon from '../../../../assets/new/profile/add-photo.svg'
import messageIcon from '../../../../assets/new/profile/mail.svg';
import EditIcon from '../../../../assets/new/profile/write.svg';
import NewUpdateIcon from '../../../../assets/new/profile/update.svg';
import TaskTodoIcon from '../../../../assets/new/profile/add-task.svg';
import ApprovePendingIcon from '../../../../assets/new/profile/Approve.svg';
import KPIIcon from '../../../../assets/new/profile/chart.svg';
import SalaryIcon from '../../../../assets/new/profile/Bonus.svg';
import ELearningIcon from '../../../../assets/new/profile/video.svg';
import OJTIcon from '../../../../assets/new/profile/user.svg';
import FolderIcon from '../../../../assets/new/profile/folder.svg';
import ReportIcon from '../../../../assets/new/profile/report.svg';

import { useHistory } from 'react-router-dom';
import FormatText2 from '../../../../utils/FormatText2';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar } from '../../UserProfile.action';
import Avatar from 'antd/lib/avatar/avatar';
import { Image } from 'antd';
import { getUrlImage } from '../../../../utils';
import { Colors } from '../../../../utils/colors';
import { Helpers } from '../../../../utils/helpers';
import AvatarCustom from '../../../../components/avatar-custom';

// eslint-disable-next-line react/prop-types
const UserInfoCard = ({ userInfo, viewAllImage }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeAvatar = async (event) => {
    dispatch(changeAvatar(event.target.files[0]));
  };

  const userImagesList = useSelector(state => state.get('userProfile').get('profileImages'));
  // console.log(123, userImagesList)
  // useEffect(() => {
  //   dispatch(getProfileUserImagesById({ userId: userInfo.Id, index: 1, pageSize: 9 }));
  //   return () => {
  //     dispatch(clearProfileImage());
  //   };
  // }, []);

  const menuAbove = [
    { title: "New Update (5)", icon: NewUpdateIcon },
    { title: "New Task (3) To do (8)", icon: TaskTodoIcon },
    { title: "Approve (Need (2) Pending(1))", icon: ApprovePendingIcon },
    { title: "KPI (OLE)", icon: KPIIcon },
  ]

  const menuBottom = [
    { title: "Salary & Bonus", icon: SalaryIcon },
    { title: "E-Learning", icon: ELearningIcon },
    { title: "My OJT", icon: OJTIcon },
    { title: "Folder", icon: FolderIcon },
    { title: "Báo cáo năng lực", icon: ReportIcon },
  ]

  return (
    <>
      <div className="info-card">
        <div className="avartar-description">
          <div className="avatar-container">
            <AvatarCustom
              className="avatar"
              src={userInfo.Avatar ? `https://filemanager.crmdemo.net/file/image?width=2000&height=1000&format=png&image_id=${userInfo.Avatar}&fit=inside` : ''}
              size={90}
              fullName={userInfo.FullName}
            />
            <Tooltip title="Thay ảnh đại diện">
              {" "}
              <div className="icon-change">
                <img  onClick={() => document.getElementById('changeAvatar')?.click()} src={cameraIcon} alt="" />
              </div>
            </Tooltip>

            <input type="file" name="avchangeAvataratar" id="changeAvatar" hidden onChange={handleChangeAvatar} />
          </div>
          <div className="description-container">
            <h4 className="title-person">{userInfo.FullName || userInfo.Email}</h4>
            <p className="description">
              {userInfo.Info ? <FormatText2 text={userInfo.Info} /> : 'Chưa thêm info'}
            </p>
          </div>
          <div className="edit-icon">
            <img width="24" src={EditIcon} onClick={() => history.push('/profile/edit')} />
          </div>
        </div>


        <div className="info-list">
          <div>
            <img src={workIcon} alt="work" />
            <p> {userInfo.JobTitle ? `Công việc ${userInfo.JobTitle}` : 'Chưa thêm địa chỉ làm việc'}</p>
          </div>
          <div>
            <img src={homeIcon} alt="home" />
            <p>{userInfo.Address ? `Sống tại ${userInfo.Address}` : 'Chưa thêm địa chỉ nhà'}</p>
          </div>
          {/* <div>
          <img src={location2Icon} alt="location" />
          <p>{userInfo.Address ? `Làm việc tại ${userInfo.Address}` : 'Chưa thêm address'}</p>
        </div> */}
          <div>
            <img src={phone} alt="home" />
            <p>{userInfo.PhoneNumber ?? 'Chưa thêm số điện thoại'}</p>
          </div>
          <div>
            <img src={zalo} alt="home" />
            <p>{userInfo.Zalo ?? 'Chưa thêm tài khoản Zalo'}</p>
          </div>
          <div>
            <img src={messageIcon} alt="mail" />
            <p>{userInfo.Email || 'Chưa thêm email'}</p>
          </div>
        </div>
      </div>
      <div className="menu-bottom">
        {menuAbove.map((rs, index) => <div key={index} className="item">
          <img src={rs.icon} />
          <span>{rs.title}</span>
        </div>)}
        <div className="div"></div>
        {menuBottom.map((rs, index) => <div key={index} className="item">
          <img src={rs.icon} />
          <span>{rs.title}</span>
        </div>)}
      </div>
      {/* <div className="list-image-account">
        <div className="header-image">
          <h4>Ảnh</h4>
          <p onClick={viewAllImage}>Xem tất cả ảnh</p>
        </div>
        <div className="list-content">
          <Row gutter={[9, 9]}>
            {userImagesList.filter((item, index) => index < 9).map((item, index) => (
              item.Code && <Col span={8} key={index}>
                <div className="content-item">
                  {item.Type === 1
                    ? <Image src={getUrlImage(0, 0, item.Code)} />
                    : item.Type === 2 ? <video width="100%" height="85%" controls alt={item.name}>
                      <source src={`https://filemanager.crmdemo.net/uploads/${item.Code}`} />
                    </video>
                      : <></>
                  }
                </div>
              </Col>
            ))}
          </Row>
        </div>

      </div> */}
    </>
  );
};

export default UserInfoCard;
