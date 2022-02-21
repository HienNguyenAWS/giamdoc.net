import React, { useState } from 'react'

import Icon from 'assets/images/glones'

const Menu = ( { menu } ) => {

    const [isHoverd, setIsHoverd] = useState(false)

    const handleHover = () => {
        setIsHoverd(!isHoverd)
    }

    return (
        <li
            className="menu-item"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            {isHoverd ? <Icon name={menu.hoverIcon}/> : <Icon name={menu.icon}/>}
            <span>{menu.label}</span>
        </li>
    )
}

export default Menu