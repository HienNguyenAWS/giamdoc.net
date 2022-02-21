import React from 'react'
import styles from './BusinessCategories.module.scss'
import BusinessCategoryItem from '../BusinessCategoryItem'

const BusinessCategories = () => {
    return (
        <div className={styles['business-category']}>
            <h3 className={styles['business-category-title']}>Business category</h3>

            <div className={styles['business-category-content']}>
                {[...new Array(5)].map((_, index) => (
                    <BusinessCategoryItem key={index} />
                ))}
            </div>
        </div>
    )
}

BusinessCategories.propTypes = {}

export default BusinessCategories
