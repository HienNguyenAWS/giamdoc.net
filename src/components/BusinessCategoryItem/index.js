import React from 'react'
import styles from './BusinessCategoryItem.module.scss'

const BusinessCategoryItem = () => {
    return (
        <div className={styles['business-category-item']}>
            <span className={styles['business-category-name']}>Business Category 1</span>
        </div>
    )
}

export default BusinessCategoryItem
