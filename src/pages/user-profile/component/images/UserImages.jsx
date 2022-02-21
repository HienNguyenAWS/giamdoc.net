/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearImage, getUserImagesById } from '../../UserProfile.action'
import { Row, Col } from 'antd'
import './UserImages.scss'
import { getUrlImage } from '../../../../utils'
import EmptyData from '../../../social/components/detail-posts/post/EmptyData'

const UserImages = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.get('userProfile').get('profile'))
    const userImagesList = useSelector(state => state.get('userProfile').get('images'))
    const isLoadMoreImage = useSelector(state => state.get('userProfile').get('isLoadMoreImage'))
    const [index, setIndex] = useState(1)
    useEffect(() => {
        dispatch(getUserImagesById({ userId: userInfo.Id, index: 1, pageSize: 12 }))
        setIndex(index + 1)

        return () => {
            dispatch(clearImage())
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handle_scroll)
        return () => window.removeEventListener('scroll', handle_scroll)
    }, [userImagesList.length])

    const handle_scroll = () => {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset

        if (windowBottom + 10 >= docHeight) {
            if (isLoadMoreImage) {
                dispatch(getUserImagesById({ userId: userInfo.Id, index, pageSize: 12 }))
                setIndex(index + 1)
            }
        } else {
        }
    }

    // console.log('image', userImagesList)

    return (
        <div className="user-image">
            <div className="new-image" onClick={() => { }}>
                <div>
                    {/* <p className="title-event">Thêm ảnh</p> */}
                    <h5 style={{ margin: 0 }} className="group-you">Ảnh/Video của bạn</h5>
                </div>
                {/* <Button
          className="btn-add-group-work"
          type="primary"
          block
          size="small"
          style={{ fontSize: '16px', height: '30px' }}
          onClick={() => {}}
        >
           + Thêm ảnh/video
        </Button> */}
            </div>
            <Row gutter={[26, 18]}>
                {userImagesList.map((item, index) => (
                    item.Code && <Col span={8} key={index}>
                        <div className="user-image">
                            { item.Type === 1
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
            {userImagesList.length === 0 && (
                <div>
                    <br />
                    <EmptyData type={'media'} />
                </div>
            )}
        </div>
    )
}

export default UserImages
