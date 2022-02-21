import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutMain from '../../../../components/LayoutMain';
import { getUserProfile } from '../../UserProfile.action';
import ChangePassword from './change-password/ChangePassword';
import EditDescription from './edit-description/EditDescription';
import EditInfo from './edit-info/EditInfo';
import './EditProfile.scss';
import Scrollbars from "react-custom-scrollbars"
import SideBar from '../../../../components/sidebar';

const EditProfile = () => {
  const [typeOfContent, setTypeOfContent] = useState('info');
  const dispatch = useDispatch();

  const userInfo = useSelector((state) =>
    state.get("userProfile").get("profile")
  );

  const [collapseLevel1, setCollapseLevel1] = useState(true)
  const [collapseLevel2, setCollapseLevel2] = useState(true)
  const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
  const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

  useEffect(() => {
    if(collapseLeft && collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(true)
    }
    else if(collapseLeft || collapseRight){
      setCollapseLevel1(true)
      setCollapseLevel2(false)
    }
    else {
      setCollapseLevel1(false)
      setCollapseLevel2(false)
    }
  }, [collapseLeft, collapseRight])

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const handleTypeOfContent = type => {
    setTypeOfContent(type);
  };

  return (
    <LayoutMain>
      <div className="common--layout">
        <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
            <SideBar title="Profile" />
        </div>
        <div className={`common--layout__main--full ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
          <div className="calendar-group-page">
            <div className='common--layout'>
              <div className='common--layout__profile user-profile'>
                <Row className="edit-profile-container" >
                  <Col span={5} className='edit-profile-header'>
                    <h4>Cá nhân</h4>
                    <p
                      className={typeOfContent === 'info' ? 'active' : ''}
                      onClick={() => handleTypeOfContent('info')}
                    >
                      Thông tin cá nhân
                    </p>
                    {/* <p
                      className={typeOfContent === 'des' ? 'active' : ''}
                      onClick={() => handleTypeOfContent('des')}
                    >
                      Chỉnh sửa giới thiệu
                    </p> */}
                    <p
                      className={typeOfContent === 'pass' ? 'active' : ''}
                      onClick={() => handleTypeOfContent('pass')}
                    >
                      Thay đổi mật khẩu
                    </p>
 

                  </Col>
                  <Col style={{backgroundColor:'#E6E6E6', width:20}}></Col>
                  <Col span={18} className="edit-profile-content" >
                    {
                      userInfo.Id && (() => {
                        switch (typeOfContent) {
                          case 'info':
                            return <EditInfo />;

                          case 'des':
                            return <EditDescription />;

                          case 'pass':
                            return <ChangePassword />;

                          default:
                            return <EditInfo />;
                        }
                      })()
                    }
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
};

export default EditProfile;