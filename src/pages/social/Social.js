import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BusinessCategories from '../../components/BusinessCategories'
import LayoutMain from '../../components/LayoutMain'
import SideBar from '../../components/sidebar'
import TemplateContent from 'components/TemplateContent'
import TopNav from 'components/TopNav'
import { useModal } from 'hooks'
import CreateTemplateModal from 'components/create-template-modal'

const Social = () => {
    const [collapseLevel1, setCollapseLevel1] = useState(true)
    const [collapseLevel2, setCollapseLevel2] = useState(true)
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    // const [paddingLeft, setPaddingLeft] = useState(0);

    // useEffect(() => {
    //     if (cookies['@isHeaderPost'] === undefined) return setIsHeaderPost(true);
    //     setIsHeaderPost(cookies['@isHeaderPost'] === 'true');
    // }, []);

    useEffect(() => {
        if (collapseLeft && collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(true)
            // setPaddingLeft(112);
        } else if (collapseLeft || collapseRight) {
            setCollapseLevel1(true)
            setCollapseLevel2(false)
            // setPaddingLeft(270);
        } else {
            setCollapseLevel1(false)
            setCollapseLevel2(false)
            // setPaddingLeft(379);
        }
    }, [collapseLeft, collapseRight])
    const {
        isShowing,
        toggle
    } = useModal()
    return (
        <LayoutMain>
            <div className="common--layout">
                <div className={`common--layout__sidebar ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <SideBar title="HRM" />
                </div>

                <div className={`page-content-wrapper ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                    <TopNav
                        buttonProps={{
                            isHighlight: true,
                            children: '+ Thêm mới',
                            onClick: () => {
                                toggle()
                            }
                        }}
                    />
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex'
                        }}
                    >
                        <TemplateContent />
                        <BusinessCategories />
                    </div>
                    <CreateTemplateModal isShowing={isShowing} hide={toggle} />
                </div>
            </div>
        </LayoutMain>
    )
}

Social.propTypes = {}

export default Social
