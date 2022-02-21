import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LayoutMain from 'components/LayoutMain'
import SideBar from 'components/sidebar'
// import HeaderPage from 'components/header-page/HeaderPage'
import HeaderBar from './components/HeadBar/HeaderBar'
import PieceworkPaymentDetail from './PieceworkPaymentDetail'

const PieceworkPayment = () => {

    const [collapseLevel1, setCollapseLevel1] = useState(true)
    const [collapseLevel2, setCollapseLevel2] = useState(true)
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))

    const title = 'Đơn giá lương khoán sản phẩm'

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

    return (
        <LayoutMain>
            <div className="common--layout">
                <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <SideBar title="HRM" />
                </div>

                <div className={`page-content-wrapper ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <div className="topnav">
                        <HeaderBar title={title}/>
                        <PieceworkPaymentDetail />
                    </div>
                </div>
            </div>
        </LayoutMain>
    )
}

export default PieceworkPayment