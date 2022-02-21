import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './TopNavMenu.module.scss'
import clsx from 'clsx'

const TopNavMenu = ({ label, icon: Icon, hoverIcon: HoverIcon, ...restProps }) => {
    const [isHoverd, setIsHoverd] = useState(false)

    const handleHoverChange = (newHover) => {
        setIsHoverd(newHover)
    }

    return (
        <div
            className={styles.menu}
            onMouseEnter={() => handleHoverChange(true)}
            onMouseLeave={() => handleHoverChange(false)}
            {...restProps}
        >
            {isHoverd ? <HoverIcon className={styles.icon} /> : <Icon className={styles.icon} />}

            <span
                activeClassName={styles['menu-active']}
                className={clsx({
                    [styles['menu-hover']]: isHoverd
                })}
            >
                {label}
            </span>
        </div>
    )
}

TopNavMenu.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    hoverIcon: PropTypes.elementType.isRequired
}

export default TopNavMenu
