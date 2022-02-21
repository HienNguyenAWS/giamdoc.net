import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './TemplateContent.module.scss'
import { ReactComponent as TodoIcon } from './icons/todo.svg'
import { ReactComponent as DashboardActiveIcon } from './icons/dashboard-active.svg'
import TemplateCard from '../TemplateCard'

const TemplateContent = () => {
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    const [templateCardContent, setTemplateCardContent] = useState('space-evenly')

    useEffect(() => {
        if (collapseLeft && collapseRight) {
            setTemplateCardContent('space-between')
        } else if (collapseLeft || collapseRight) {
            setTemplateCardContent('space-evenly')
        } else {
            setTemplateCardContent('space-evenly')
        }
    }, [collapseLeft, collapseRight])

    return (
        <div className={styles['template-content']}>
            <div className={styles['template-selector']}>
                <button className={styles['template-selector-btn-active']}>
                    <DashboardActiveIcon className={styles['template-selector-icon']} />
                    <span>Bộ Template</span>
                </button>

                <button className={styles['template-selector-btn']}>
                    <TodoIcon className={styles['template-selector-icon']} />
                    <span>Template Riêng</span>
                </button>
            </div>

            <div
                className={styles['template-wrap']}
                style={{
                    justifyContent: templateCardContent
                }}
            >
                {[...new Array(12)].map((_, index) => (
                    <TemplateCard key={index} />
                ))}
            </div>
        </div>
    )
}

export default TemplateContent
