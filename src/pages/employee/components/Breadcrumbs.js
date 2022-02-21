import React from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import './breadcrumbs.scss'

const Breadcrumbs = (props) => {
    const { title } = props
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">
                <HomeOutlined />
                <span>Dashboard</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/employees">
                <UserOutlined />
                <span>Employees</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ title }</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs