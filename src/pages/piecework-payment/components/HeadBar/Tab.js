import React, { useState } from 'react'
import Icon from 'assets/images/glones'

const Tab = ( { tab } ) => {

    const [isHoverd, setIsHoverd] = useState(false)

    const handleHover = () => {
        setIsHoverd(!isHoverd)
    }

    return (
        <li
            className="tab-item"
            onMouseEnter={ handleHover }
            onMouseLeave={ handleHover }
        >
            { isHoverd ? <Icon name={tab.activeIcon}/> : <Icon name={tab.icon}/>}
            <span>{tab.label}</span>
        </li>
    )
}

export default Tab