import React from 'react'
import './style.scss'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import { Colors } from '../../utils/colors'
import { Helpers } from '../../utils/helpers'

const AvatarCustom = ({
    src, fullName, ...rest
}) => {
    return (
        <div className="AvatarCustom">
            <Avatar
                src={src && src}
                style={{ color: Colors.blazeOrange, backgroundColor: Colors.oasis, padding: 0 }}
                {...rest}
            >{Helpers.convertFullNameToImage(fullName)}</Avatar>
        </div>
    )
}

AvatarCustom.propTypes = {
    src: PropTypes.string,
    fullName: PropTypes.string
}

export default AvatarCustom
