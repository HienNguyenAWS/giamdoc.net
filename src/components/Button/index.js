import React from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Button = ({ isHighlight, className, children, ...restProps }) => (
    <button
        className={clsx(styles.button, className, {
            [styles.highlight]: isHighlight
        })}
        {...restProps}
    >
        {children}
    </button>
)

Button.propTypes = {
    isHighlight: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
}

Button.defaultProps = {
    isHighlight: false,
    className: ''
}

export default Button
