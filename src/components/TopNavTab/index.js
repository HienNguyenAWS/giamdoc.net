import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink } from 'react-router-dom'
import styles from './TopNavTab.module.scss'
import clsx from 'clsx'

const TopNavTab = ({ active, href, label, icon: Icon, activeIcon: ActiveIcon }) => {
    const [isHoverd, setIsHoverd] = useState(false)

    const handleHoverChange = (newHover) => {
        setIsHoverd(newHover)
    }

    return (
        <div
            className={styles.tab}
            onMouseEnter={() => handleHoverChange(true)}
            onMouseLeave={() => handleHoverChange(false)}
        >
            {active || isHoverd ? <ActiveIcon className={styles.icon} /> : <Icon className={styles.icon} />}
            <RouterNavLink
                to={href}
                activeClassName={styles['tab-active']}
                className={clsx({
                    [styles['tab-hover']]: isHoverd
                })}
            >
                {label}
            </RouterNavLink>
        </div>
    )
}

TopNavTab.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    activeIcon: PropTypes.elementType.isRequired
}

TopNavTab.defaultProps = {
    active: false,
    href: ''
}

export default TopNavTab
