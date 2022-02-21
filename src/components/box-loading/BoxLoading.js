import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const BoxLoading = ({ size = 24, isWhite = false }) => {
    const antIcon = (
        <div className={isWhite ? 'spin-white' : ''}>
            <LoadingOutlined style={{ fontSize: size }} spin />
        </div>
    )

    return <Spin indicator={antIcon} />
}

BoxLoading.propTypes = { size: PropTypes.number, isWhite: PropTypes.bool }

export default BoxLoading
