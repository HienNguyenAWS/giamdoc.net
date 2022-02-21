import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LayoutMain from 'components/LayoutMain'
import SideBar from 'components/sidebar'
import HeaderBar from './components/HeadBar/HeaderBar'
import PayGrades01 from './templates/paygrades-01/PayGrades01'
import PayGrades02 from './templates/paygrades-02/PayGrades02'
import PayGrades03 from './templates/paygrades-03/PayGrades03'

import {
    PAY_GRADES_TEMPLATE_ONE,
    PAY_GRADES_TEMPLATE_TWO,
    // PAY_GRADES_TEMPLATE_THREE,
    PAY_GRADES_TEMPLATE_ONE_TITLE,
    PAY_GRADES_TEMPLATE_TWO_TITLE,
    PAY_GRADES_TEMPLATE_THREE_TITLE
} from 'constants/constants'

const PayGradesDetail = () => {

    const [collapseLevel1, setCollapseLevel1] = useState(true)
    const [collapseLevel2, setCollapseLevel2] = useState(true)
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    const [templateId, setTemplateId] = useState(1)

    const { id } = useParams()
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (collapseLeft && collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(true)
        } else if (collapseLeft || collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(false)
        } else {
            setCollapseLevel1(false)
            setCollapseLevel2(false)
        }
    }, [collapseLeft, collapseRight])

    useEffect(() => {
        if (id == PAY_GRADES_TEMPLATE_ONE) {
            setTemplateId(id)
            setTitle(PAY_GRADES_TEMPLATE_ONE_TITLE)
        } else if (id == PAY_GRADES_TEMPLATE_TWO) {
            setTemplateId(id)
            setTitle(PAY_GRADES_TEMPLATE_TWO_TITLE)
        } else {
            setTemplateId(id)
            setTitle(PAY_GRADES_TEMPLATE_THREE_TITLE)
        }
    }, [id])

    const renderPayGradesTemplate = (id) => {
        switch (id) {
        case '1':
            return <PayGrades01 />
        case '2':
            return <PayGrades02 />
        case '3':
            return <PayGrades03 />
        default:
            return <PayGrades01 />
        }
    }

    return (
        <LayoutMain>
            <div className="common--layout">
                <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <SideBar title="HRM" />
                </div>

                <div className={`page-content-wrapper ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <HeaderBar title={title} />

                    { renderPayGradesTemplate(templateId) }
                </div>
            </div>
        </LayoutMain>
    )
}

export default PayGradesDetail