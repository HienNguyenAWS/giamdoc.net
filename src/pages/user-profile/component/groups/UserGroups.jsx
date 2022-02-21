/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './UserGroups.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getListGroup, clearListGroup } from '../../../group/Group.action'
import { selectListGroup, selectIsLoadMore } from '../../../group/Group.selector'
import { useHistory } from 'react-router-dom'
import ListGroupGrid from '../../../group/components/list-group-grid/ListGroupGrid'

const UserGroups = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [index, setIndex] = useState(1)
    const listGroups = useSelector(selectListGroup())
    const isLoadMore = useSelector(selectIsLoadMore())

    useEffect(() => {
        dispatch(getListGroup({ keySearch: '', index: 1, pageSize: 12 }))
        setIndex(index + 1)
        return () => {
            dispatch(clearListGroup())
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handle_scroll)
        return () => window.removeEventListener('scroll', handle_scroll)
    }, [listGroups.length])

    const handle_scroll = () => {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset
        console.log(isLoadMore)
        if (windowBottom + 10 >= docHeight) {
            if (isLoadMore) {
                console.log('index', index)
                dispatch(getListGroup({ keySearch: '', index, pageSize: 12 }))
                setIndex(index + 1)
            }
        // eslint-disable-next-line no-empty
        } else {
        }
    }
    return (
        <div>
            <div className="new-group" onClick={() => history.push('/group-work')}>
                <div>
                    <h5 style={{ margin: 0 }} className="group-you">Nhóm của bạn</h5>
                </div>
                {/* <Button
          className="btn-add-group-work"
          type="primary"
          size="small"
          block
          style={{ fontSize: '16px', height: '30px' }}
          onClick={() => toggleShowCreate(true)}
        >
          + Thêm nhóm
        </Button> */}
            </div>
            {/* {listGroups.map((item, index) => ( */}
            <ListGroupGrid key={index} />
            {/* ))} */}
        </div>
    )
}

export default UserGroups
