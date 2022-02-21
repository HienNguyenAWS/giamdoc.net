import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LayoutMain from 'components/LayoutMain'
import SideBar from 'components/sidebar'
import Create from './components/Create'
import List from './components/List'
import Edit from './components/Edit'
import './employee.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Employee = () => {

    const [collapseLevel1, setCollapseLevel1] = useState(true)
    const [collapseLevel2, setCollapseLevel2] = useState(true)
    const collapseLeft = useSelector((state) => state.get('global').get('expandCollapseLeft'))
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))

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
                <Router>
                    <Switch>
                        <div className={`page-content-wrapper ${collapseLevel1 ? 'level1' : ''} ${collapseLevel2 ? 'level2' : ''}`}>
                            <Route exact path='/employees' component={List} />
                            <Route exact path='/employees/create' component={Create} />
                            <Route exact path='/employees/edit/:id' component={Edit} />
                        </div>
                    </Switch>
                </Router>
            </div>
        </LayoutMain>
    )
}

export default Employee