/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AppActiveIcon from '../../assets/new/side-bar/hrm/app-active.svg'
import AppIcon from '../../assets/new/side-bar/hrm/app.svg'
import BonusActiveIcon from '../../assets/new/side-bar/hrm/bonus-active.svg'
import BonusIcon from '../../assets/new/side-bar/hrm/bonus.svg'
import ContactActiveIcon from '../../assets/new/side-bar/hrm/contact-active.svg'
import ContactIcon from '../../assets/new/side-bar/hrm/contact.svg'
import DoneActiveIcon from '../../assets/new/side-bar/hrm/done-active.svg'
import DoneIcon from '../../assets/new/side-bar/hrm/done.svg'
import GroupActiveIcon from '../../assets/new/side-bar/hrm/group-active.svg'
import GroupIcon from '../../assets/new/side-bar/hrm/group.svg'
import MoneyActiveIcon from '../../assets/new/side-bar/hrm/money-1-active.svg'
import MoneyIcon from '../../assets/new/side-bar/hrm/money-1.svg'
import PersonActiveIcon from '../../assets/new/side-bar/hrm/person-active.svg'
import PersonIcon from '../../assets/new/side-bar/hrm/person.svg'
import RecordVoiceActiveIcon from '../../assets/new/side-bar/hrm/record_voice-active.svg'
import RecordVoiceIcon from '../../assets/new/side-bar/hrm/record_voice.svg'
import SupervisedActiveIcon from '../../assets/new/side-bar/hrm/supervised-active.svg'
import SupervisedIcon from '../../assets/new/side-bar/hrm/supervised.svg'
import NewsActiveIcon from '../../assets/new/side-bar/news-active-icon.svg'
import NewsIcon from '../../assets/new/side-bar/newsIcon.png'
import { default as OJTActiveIcon, default as OJTIcon } from '../../assets/new/side-bar/ojt-active-icon.svg'
import { default as PageActiveIcon, default as PageIcon } from '../../assets/new/side-bar/pages-active-icon.svg'
import { default as SocialActiveIcon, default as SocialIcon } from '../../assets/new/side-bar/social-active-icon.svg'
import { default as VideoActiveIcon, default as VideoIcon } from '../../assets/new/side-bar/video elearing.svg'
import { default as LiveActiveIcon, default as LiveIcon } from '../../assets/new/side-bar/video-cam.svg'
import { useSidebarModules } from '../../hooks'

const SidebarRight = (props) => {
    const { sidebarActive } = props
    const history = useHistory()
    const [columns, setColumns] = useState([])
    const collapseRight = useSelector((state) => state.get('global').get('expandCollapseRight'))
    const { SidebarModules } = useSidebarModules()
    const [activeSidebarRight, setActiveSidebarRight] = useState('')

    const getListItemSideBar = useCallback(
        (indexList) => {
            switch (sidebarActive) {
            case SidebarModules.Media:
                switch (indexList) {
                case 1:
                    return [
                        {
                            id: uuidv4(),
                            key: 0,
                            title: 'Social',
                            icon: SocialIcon,
                            iconActive: SocialActiveIcon,
                            linkTo: '/social'
                        },
                        {
                            id: uuidv4(),
                            key: 1,
                            title: 'News',
                            icon: NewsIcon,
                            iconActive: NewsActiveIcon,
                            linkTo: '/news'
                        },
                        {
                            id: uuidv4(),
                            key: 2,
                            title: 'Page & Blog',
                            icon: PageIcon,
                            iconActive: PageActiveIcon,
                            linkTo: '/page-and-blog'
                        }
                    ]

                case 2:
                    return [
                        {
                            id: uuidv4(),
                            key: 3,
                            title: 'Video Learning',
                            icon: VideoIcon,
                            iconActive: VideoActiveIcon,
                            linkTo: '/video-learning'
                        },
                        {
                            id: uuidv4(),
                            key: 4,
                            title: 'Live Class',
                            icon: LiveIcon,
                            iconActive: LiveActiveIcon,
                            linkTo: '/live-class'
                        },
                        {
                            id: uuidv4(),
                            key: 5,
                            title: 'My OJT',
                            icon: OJTIcon,
                            iconActive: OJTActiveIcon,
                            linkTo: '/my-ojt'
                        }
                    ]
                }

            case SidebarModules.HRM:
                switch (indexList) {
                case 1:
                    return [
                        {
                            id: uuidv4(),
                            key: 0,
                            title: 'Dashboard',
                            icon: AppIcon,
                            iconActive: AppActiveIcon,
                            linkTo: '/dashboard'
                        },
                        {
                            id: uuidv4(),
                            key: 1,
                            title: 'Tuyển dụng',
                            icon: RecordVoiceIcon,
                            iconActive: RecordVoiceActiveIcon,
                            linkTo: '/recruitment'
                        },
                        {
                            id: uuidv4(),
                            key: 2,
                            title: 'Quản lý nhân sự',
                            icon: ContactIcon,
                            iconActive: ContactActiveIcon,
                            linkTo: '/hrm'
                        },
                        {
                            id: uuidv4(),
                            key: 3,
                            title: 'Cơ chế lương thưởng',
                            icon: MoneyIcon,
                            iconActive: MoneyActiveIcon,
                            linkTo: '/bonus-salary'
                        },
                        {
                            id: uuidv4(),
                            key: 4,
                            title: 'Tính lương thưởng',
                            icon: BonusIcon,
                            iconActive: BonusActiveIcon,
                            linkTo: '/bonus-salary-calculator'
                        },
                        {
                            id: uuidv4(),
                            key: 5,
                            title: 'Năng lực đội ngũ',
                            icon: SupervisedIcon,
                            iconActive: SupervisedActiveIcon,
                            linkTo: '/team-ability'
                        }
                    ]

                case 2:
                    return [
                        {
                            id: uuidv4(),
                            key: 6,
                            title: 'Danh sách nhân viên',
                            icon: GroupIcon,
                            iconActive: GroupActiveIcon,
                            linkTo: '/employees'
                        },
                        {
                            id: uuidv4(),
                            key: 7,
                            title: 'Chấm công',
                            icon: PersonIcon,
                            iconActive: PersonActiveIcon,
                            linkTo: '/timekeeping'
                        },
                        {
                            id: uuidv4(),
                            key: 8,
                            title: 'Check in',
                            icon: DoneIcon,
                            iconActive: DoneActiveIcon,
                            linkTo: '/checkin'
                        }
                    ]
                }
            }
        },
        [sidebarActive, SidebarModules]
    )

    const blocksItem = useMemo(
        () => ({
            [uuidv4()]: {
                name: 'listItemSideBar1',
                items: getListItemSideBar(1)
            },
            [uuidv4()]: {
                name: 'listItemSideBar2',
                items: getListItemSideBar(2)
            }
        }),
        [getListItemSideBar]
    )

    useEffect(() => {
        setColumns(blocksItem)
    }, [blocksItem])

    const isCheckActive = useCallback((item) => item.linkTo === activeSidebarRight, [activeSidebarRight])

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            const _column = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
            setColumns(_column)
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            const _column = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }
            setColumns(_column)
        }
    }

    const goTo = (linkTo) => {
        history.push(linkTo)
        setActiveSidebarRight(linkTo)
    }

    useEffect(() => {
        Object.entries(columns).map(([columnId, column], index) => {
            // console.log('COLOUMN', column);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        //
    }, [])

    return (
        <div>
            {collapseRight ? (
                <div>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <>
                                <div
                                    className={`sidebar--layout__right--divide ${collapseRight ? 'collapse' : ''}`}
                                    style={{ borderBottom: '1px solid #C4C4C4' }}
                                ></div>
                                <div
                                    className="sidebar--layout__right--block"
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {column.items.map((item) => {
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => goTo(item.linkTo)}
                                                className={`sidebar--layout__right--block__item ${isCheckActive(item) ? 'active' : ''}`}
                                                style={{
                                                    userSelect: 'none'
                                                }}
                                            >
                                                <Tooltip placement="right" title={item.title}>
                                                    <img
                                                        className="sidebar--layout__right--block__item--icon"
                                                        src={isCheckActive(item) ? item.iconActive : item.icon}
                                                        width={24}
                                                        height={24}
                                                    ></img>
                                                </Tooltip>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}
                </div>
            ) : (
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div key={columnId}>
                                <div className="sidebar--layout__right--divide" style={{ borderBottom: '1px solid #C4C4C4' }}></div>
                                <div style={{ margin: '8px 0px' }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="sidebar--layout__right--block"
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            onClick={() => goTo(item.linkTo)}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={`sidebar--layout__right--block__item ${
                                                                                isCheckActive(item) ? 'active' : ''
                                                                            }`}
                                                                            style={{
                                                                                userSelect: 'none',
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <img
                                                                                className="sidebar--layout__right--block__item--icon"
                                                                                src={isCheckActive(item) ? item.iconActive : item.icon}
                                                                                width={24}
                                                                                height={24}
                                                                            ></img>
                                                                            <div>
                                                                                <span className="sidebar--layout__right--block__item--title">{item.title}</span>
                                                                                {item.titleSub && (
                                                                                    <span
                                                                                        className="sidebar--layout__right--block__item--title"
                                                                                        style={{ float: 'left' }}
                                                                                    >
                                                                                        {item.titleSub}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                    })}
                </DragDropContext>
            )}
        </div>
    )
}

SidebarRight.propTypes = {
    sidebarActive: PropTypes.string.isRequired
}

export default SidebarRight
