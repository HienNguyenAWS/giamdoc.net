import React from 'react'
import PropTypes from 'prop-types'
// import { Progress } from "antd";
import BoxLoading from '../box-loading/BoxLoading'
import './Loading.scss'

const LoadingFullPage = ({
    title,
    description,
    redirect,
    size = 24,
    isWhite = false
}) => {
    return (
        <div className={`loading-fullpage ${redirect ? 'redirect' : ''}`}>
            <div className="wrapper">
                <p className="title">{title}</p>
                <p className="description">{description}</p>
                {/* <Progress
          percent={30}
          showInfo={false}
          strokeColor="#fff"
          trailColor="#E9F0F47A"
          strokeWidth={15}
        /> */}
                <BoxLoading size={size} isWhite={isWhite} />
            </div>
        </div>
    )
}

LoadingFullPage.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    redirect: PropTypes.bool,
    size: PropTypes.number,
    isWhite: PropTypes.bool
}

export default LoadingFullPage
