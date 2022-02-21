
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import LayoutMain from '../../components/LayoutMain';
import background from '../../assets/images/185455886_1414086052302113_7919415175568973752_n.jpeg';
import { Col, Image, Input, Row, Tooltip, Modal } from 'antd';
import {
    UserInfoCard,
    UserIntroduce,
    UserTasks,
    UserEvents,
    UserGroups,
    UserImages,
    UserCalendar,
    TimeLine
} from './component';
import NewPost from '../social/components/new-post/NewPost';
import searchIcon from '../../assets/new/event/search.svg';
import { useSelector, useDispatch } from 'react-redux';
import bannerDefault from '../../assets/new/common/banner-default.png';
import cameraIcon from '../../assets/new/event/camera.svg';
import { clearProfileImage, getProfileUserImagesById } from './UserProfile.action';
import { changeCover } from './UserProfile.action';
import Scrollbars from 'react-custom-scrollbars';
import SideBar from '../../components/sidebar';
import PostActiveIcon from '../../assets/new/user-profile/post-active-icon.svg'
import PostIcon from '../../assets/new/user-profile/post-icon.svg'
import GroupIcon from '../../assets/new/user-profile/group-icon.svg'
import ImageIcon from '../../assets/new/user-profile/image-icon.svg'
import VoteIcon from '../../assets/new/user-profile/vote-icon.svg'
import EventIcon from '../../assets/new/user-profile/event-icon.svg'
import GroupActiveIcon from '../../assets/new/user-profile/group-active-icon.svg'
import ImageActiveIcon from '../../assets/new/user-profile/image-active-icon.svg'
import VoteActiveIcon from '../../assets/new/user-profile/vote-active-icon.svg'
import EventActiveIcon from '../../assets/new/user-profile/event-active-icon.svg'

import Search from '../../assets/new/user-profile/search.svg';

const UserProfile = () => {
    const dispatch = useDispatch();

    const [typeOfTab, setTypeOfTab] = useState('timeline');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisibleImage, setIsVisibleImage] = useState(false);
    const [isExpand, setIsExpand] = useState(false);

    const [imagesPreview, setImagesPreview] = useState(null);
    const [styleSideBar, setStyleSideBar] = useState({});
    const [bottomSidebar, setBottom] = useState(null);
    const [textSearch, setTextSearch] = useState('');

    const [collapseLevel1, setCollapseLevel1] = useState(true)
    const [collapseLevel2, setCollapseLevel2] = useState(true)
    const collapseLeft = useSelector(state => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector(state => state.get('global').get('expandCollapseRight'))

    useEffect(() => {
        if (collapseLeft && collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(true)
        }
        else if (collapseLeft || collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(false)
        }
        else {
            setCollapseLevel1(false)
            setCollapseLevel2(false)
        }
    }, [collapseLeft, collapseRight])

    const userInfo = useSelector((state) =>
        state.get('userProfile').get('profile')
    );
    let lastScroll = 0;
    useEffect(() => {
        window.addEventListener('scroll', handle_scroll);
        return () => window.removeEventListener('scroll', handle_scroll);
    }, []);

    let isUp = true;
    let currentHeight = 0;
    let currentHeightOffset = 0
    const handle_scroll = () => {
        const top = 62
        const topDistance = 460;
        let element2 = document.getElementById('upper-left-side')
        const element = document.getElementById('left-side-profile')
        if (element === null) return;
        const domRect = element.getBoundingClientRect();
        const cal = (domRect.height - (window.innerHeight - 15)) * -1
        if (window.pageYOffset > lastScroll) {
            console.log('currentHeight', currentHeight)
            setStyleSideBar(cal > top ? top : cal)

            if (cal > top) {
                element2.style.height = '0px'
            }
            else {
                element2.style.height = (window.pageYOffset - topDistance) < 0 ? '0px' : currentHeightOffset - 330 + 'px'
                // currentHeight=numCal - 400
            }
            setBottom(null)
            isUp = true
        }
        if (window.pageYOffset <= lastScroll && (cal < 52)) {
            //UP
            currentHeightOffset = window.pageYOffset
            let numCal = window.pageYOffset === 0 ? 0 : window.pageYOffset - (domRect.height - window.innerHeight) - topDistance;
            if (isUp === true) {
                setStyleSideBar(null)
                setBottom(cal - 36)
                element2.style.height = numCal + 0 + 'px'
            }
            currentHeight = numCal
            isUp = false;
        }
        lastScroll = window.pageYOffset
    }

    // console.log('userInfo', userInfo)

    useEffect(() => {
        if (userInfo && userInfo.Id) {
            setImagesPreview(userInfo.ImgCover)
            dispatch(getProfileUserImagesById({ userId: userInfo.Id, index: 1, pageSize: 9 }));
        }

        return () => {
            dispatch(clearProfileImage());
            setImagesPreview(userInfo.ImgCover)
        };
    }, [dispatch, userInfo])
    const handleUploadImages = (event) => {
        dispatch(changeCover(event.target.files[0]));
    };

    const onClickCoverImage = () => {
        setIsVisibleImage(true)
    }

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
                                <Row>
                                    <Col span={24}>
                                        <div
                                            className='user-background'
                                            style={{
                                                backgroundImage: `url(${imagesPreview
                                                    ? `https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${imagesPreview}&fit=inside`
                                                    : bannerDefault
                                                })`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                backgroundPosition: '0'
                                            }}
                                            onClick={() => onClickCoverImage()}
                                        >
                                            <div className='cam-change'
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <label htmlFor='imageInputCover' style={{ cursor: 'pointer' }}>
                                                    <Tooltip placement='top' title='Thay đổi ảnh nền'>
                                                        <img src={cameraIcon} alt="" />
                                                    </Tooltip>
                                                </label>
                                                <input
                                                    type='file'
                                                    name='imageCover'
                                                    id='imageInputCover'
                                                    multiple
                                                    onChange={handleUploadImages}
                                                    onClick={e => e.stopPropagation()}
                                                />
                                            </div>
                                            {/* <div className="text-preview">Xem ảnh</div> */}
                                            <Image id="cover-image" hidden src={imagesPreview
                                                ? `https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${imagesPreview}&fit=inside`
                                                : bannerDefault}
                                            preview={{
                                                visible: isVisibleImage,
                                                onVisibleChange: () => { setIsVisibleImage(false) }
                                            }}></Image>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col className="side-bar-user" span={6}>
                                        <div id="upper-left-side" className="fixed-position" ></div>
                                        <div id="left-side-profile" style={{ top: styleSideBar, bottom: bottomSidebar }} className='left-site'>
                                            <UserInfoCard userInfo={userInfo} viewAllImage={() => setTypeOfTab('image')} />
                                        </div>
                                    </Col>
                                    <Col span={18} className='profile-detail'>
                                        <Row>
                                            <Col span={24}>
                                                <div className="tabs-bar">
                                                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', width:'80%' }}>
                                                        <div className={`tabs-bar--item ${typeOfTab === 'timeline' ? 'active' : ''}`} onClick={() => setTypeOfTab('timeline')}>
                                                            <img src={typeOfTab === 'timeline' ?PostActiveIcon :PostIcon } className={`${typeOfTab === 'timeline' ? '' : 'w--15'}`}/>
                                                            <p>Tin nội bộ</p>
                                                        </div>
                                                        {typeOfTab !== 'event' && typeOfTab !== 'timeline' && <div className="tabs-bar--div"></div>}
                                                        <div className={`tabs-bar--item  ${typeOfTab === 'event' ? 'active' : ''}`} onClick={() => setTypeOfTab('event')}>
                                                            <img src={typeOfTab === 'event' ?EventActiveIcon : EventIcon} className={`${typeOfTab === 'event' ? '' : 'w--15'}`} />
                                                            <p>Sự kiện</p>
                                                        </div>
                                                        {typeOfTab !== 'event' && typeOfTab !== 'group' && <div className="tabs-bar--div"></div>}
                                                        <div className={`tabs-bar--item  ${typeOfTab === 'group' ? 'active' : ''}`} onClick={() => setTypeOfTab('group')}>
                                                            <img src={typeOfTab === 'group' ? GroupActiveIcon : GroupIcon} className={`${typeOfTab === 'group' ? '' : 'w--15'}`}/>
                                                            <p>Nhóm</p>
                                                        </div>
                                                        {typeOfTab !== 'group' && typeOfTab !== 'task' && <div className="tabs-bar--div"></div>}
                                                        <div className={`tabs-bar--item  ${typeOfTab === 'task' ? 'active' : ''}`} onClick={() => setTypeOfTab('task')}>
                                                            <img src={typeOfTab === 'task' ?VoteActiveIcon : VoteIcon} className={`${typeOfTab === 'task' ? '' : 'w--15'}`}/>
                                                            <p>Khảo sát</p>
                                                        </div>
                                                        {typeOfTab !== 'task' && typeOfTab !== 'image' && <div className="tabs-bar--div"></div>}
                                                        <div className={`tabs-bar--item  ${typeOfTab === 'image' ? 'active' : ''}`} onClick={() => setTypeOfTab('image')}>
                                                            <img src={typeOfTab === 'image' ?ImageActiveIcon :ImageIcon } className={`${typeOfTab === 'image' ? '' : 'w--15'}`}/>
                                                            <p>Ảnh</p>
                                                        </div>
                                                    </div>
                                                    {(typeOfTab !== 'group' && typeOfTab !== 'image') && <div className="tabs-bar--right">
                                                        <Input
                                                            className="tabs-bar--right-search"
                                                            placeholder='Tìm kiếm'
                                                            onChange={(e) => setTextSearch(e.target.value)}
                                                            suffix={<img src={Search} />}
                                                        />
                                                    </div>}
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                {(() => {
                                                    switch (typeOfTab) {
                                                    case 'timeline':
                                                        return <TimeLine searchKey={textSearch} />;
                                                    case 'event':
                                                        return <UserEvents searchKey={textSearch} />;
                                                    case 'task':
                                                        return <UserTasks searchKey={textSearch} />;
                                                        // case 'vote':
                                                        //   return <UserEvents searchKey={textSearch} />;
                                                    case 'group':
                                                        return <UserGroups />;
                                                    case 'image':
                                                        return <UserImages />;
                                                    }
                                                })()}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Modal
                            width="70%"
                            visible={isModalVisible}
                            closeable
                            title="Xem ảnh"
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                            className="modalImage"
                        >
                            <Image
                                style={{ width: '100%' }}
                                src={
                                    imagesPreview
                                        ? `https://filemanager.crmdemo.net/file/image?width=1500&height=800&format=png&image_id=${imagesPreview}&fit=inside`
                                        : bannerDefault
                                }
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </LayoutMain>
    );
};
export default UserProfile;
