/* eslint-disable */
import React, { useState } from 'react'

const withActiveIcon = WrappedIcon => ({ activeIcon: ActiveIcon, ...restProps }) => {
    const [hovered, setHoverd] = useState(false)

    const handleHoverChange = newState => {
        setHoverd(newState)
    }

    return hovered ? (
        <ActiveIcon
            style={{ cursor: 'pointer' }}
            {...restProps}
            onMouseEnter={() => handleHoverChange(true)}
            onMouseLeave={() => handleHoverChange(false)}
        />
    ) : (
        <WrappedIcon
            {...restProps}
            onMouseEnter={() => handleHoverChange(true)}
            onMouseLeave={() => handleHoverChange(false)}
        />
    )
}

export default withActiveIcon
