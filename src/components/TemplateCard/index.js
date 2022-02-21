import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as CopyIcon } from './icons/copy.svg'
import { ReactComponent as DeleteIcon } from './icons/delete.svg'
import { ReactComponent as EditIcon } from './icons/edit.svg'
import { ReactComponent as BlockPublicIcon } from './icons/lock-public.svg'
import { ReactComponent as MoreIcon } from './icons/more.svg'
import { ReactComponent as PulicIcon } from './icons/pulic.svg'
import templateLogo from './icons/template.png'
import { ReactComponent as ViewIcon } from './icons/view.svg'
import styles from './TemplateCard.module.scss'

const TemplateCard = () => {
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    const [widthCard, setWidthCard] = useState('33.3%')

    useEffect(() => {
        if (collapseLeft && collapseRight) {
            setWidthCard('25%')
        } else {
            setWidthCard('33.3%')
        }
    }, [collapseLeft, collapseRight])

    return (
        <div className={styles['template-card-wrap']} style={{ width: widthCard }}>
            <div className={styles['template-card']}>
                <div className={styles['template-card-img-wrap']}>
                    <img className={styles['template-card-img']} src={templateLogo} alt="card-img" />
                </div>
                <div className={styles['template-card-body-wrap']}>
                    <div className={styles['template-card-body-public']}>
                        <PulicIcon className={styles['template-card-public-icon']} />
                        <span className={styles['template-card-public-title']}>Công khai</span>
                    </div>

                    <div className={styles['template-card-body-name']}>Bộ Template</div>

                    <div className={styles['template-card-body-code']}>Mã: 0000000000</div>

                    <div className={styles['template-card-body-preview-wrap']}>
                        <div className={styles['template-card-body-preview']}>
                            <ViewIcon className={styles['template-card-preview-icon']} />
                            <span className={styles['template-card-preview-title']}>Xem trước</span>
                        </div>
                    </div>
                </div>

                <div className={styles['template-card-more-actions']}>
                    <MoreIcon className={styles['template-card-more-icon']} />

                    <ul className={styles['template-card-actions-detail']}>
                        <li className={styles['template-card-action-item']}>
                            <EditIcon className={styles['template-card-action-item-icon']} />
                            <span className={styles['template-card-action-item-title']}>Sửa</span>
                        </li>
                        <li className={styles['template-card-action-item']}>
                            <BlockPublicIcon className={styles['template-card-action-item-icon']} />
                            <span className={styles['template-card-action-item-title']}>Ẩn</span>
                        </li>
                        <li className={styles['template-card-action-item']}>
                            <CopyIcon className={styles['template-card-action-item-icon']} />
                            <span className={styles['template-card-action-item-title']}>Nhân bản</span>
                        </li>
                        <li className={styles['template-card-action-item']}>
                            <DeleteIcon className={styles['template-card-action-item-icon']} />
                            <span className={styles['template-card-action-item-title']}>Xoá</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TemplateCard
