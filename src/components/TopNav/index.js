import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button'
import HeaderPage from 'components/header-page/HeaderPage'

const TopNav = ({ buttonProps }) => {

    const title = 'Cơ chế chi trả lương và thu nhập người lao động'

    return (
        <div className='topnav'>
            <HeaderPage title={title}/>

            <div className='bottom'>
                {buttonProps ? <Button {...buttonProps} /> : <span />}
            </div>
        </div>
    )
}

TopNav.propTypes = {
    title: PropTypes.string.isRequired,
    showActions: PropTypes.bool,

    buttonProps: PropTypes.object,

    menuData: PropTypes.array,
    tabs: PropTypes.array
}

TopNav.defaultProps = {
    buttonProps: null,
    showActions: false,
    menuData: [],
    tabs: []
}

export default TopNav
