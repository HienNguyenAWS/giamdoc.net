/* eslint-disable indent */
import {
    CloseOutlined,
    MoreOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    CheckOutlined

} from '@ant-design/icons'
import { Button, Input, Popconfirm, Popover, Space, Modal } from 'antd'
import clsx from 'clsx'
// import Modal from 'antd/lib/modal/Modal';
import React, { useRef ,useState } from 'react'
import Pen from 'pages/piecework-payment/components/Pen'
import { generateNewChild } from 'utils/PieceworkHelper'

export const useColumns = ({
    deleteSection,
    addMode,
    onClickDeleteChild,
    hoverKey,
    setDataValue,
    data,
    isEditing,
    editingKey,
    save,
    titleCols,
    updateTitleCol,
    cancel
}) => {
    // const [dataCurrent, setDataCurrent] = useState(initialDataRef.current)
    const confirm = record => {
        Modal.confirm({
            title: 'Confirm delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete this section?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: close => {
                deleteSection(record)
                close()
            }
        })
    }
    const [visibleKey, setVisibleKey] = useState(false)
    const hide = () => {
        setVisibleKey('')
    }

    const handleVisibleChange = (visible, key) => {
        if (!visibleKey) {
            setVisibleKey(key)
        } else if (!visible && visibleKey === key) {
            setVisibleKey('')
        }
    }

    const [titleTableList, setTitleTableList] = useState({
        infor: {
            title: 'Phòng nhân sự',
            isHovered: false,
            isClicked: false
        },
        wattage: {
            title: '100000',
            isHovered: false,
            isClicked: false
        },
        budget: {
            title: '1.000.000.000',
            isHovered: false,
            isClicked: false
        },
        rules1: {
            title: 'Quy tắc 1',
            isHovered: false,
            isClicked: false
        },
        rules2: {
            title: 'Quy tắc 2',
            isHovered: false,
            isClicked: false
        },
        rules3: {
            title: 'Quy tắc 3',
            isHovered: false,
            isClicked: false
        }

    })
    const titleTableListRef = useRef(JSON.parse(JSON.stringify(titleTableList)))

    const handleTitleTableSave = columnName => {
        const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
        newTitleTableList[columnName].isClicked = false
        newTitleTableList[columnName].isHovered = false
        titleTableListRef.current = newTitleTableList
        setTitleTableList(newTitleTableList)
    }
    const handleTitleTableCancel = columnName => {
        titleTableListRef.current[columnName].isClicked = false
        titleTableListRef.current[columnName].isHovered = false
        setTitleTableList(titleTableListRef.current)
    }
  
    const renderIndex = (text, record) => {
        const isChild = record.key.includes('.')
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: record.key, props: {} }
        if (text === 'add') {
            const [parentKey] = record.key.split('.')
            obj.props.colSpan = 1
            const siblings = data[parentKey - 1].children
            const currentLength = siblings.length

            obj.children = (
                <div className='add-child-row'>
                    <Button
                        icon={<PlusCircleOutlined className='btn--primary' />}
                        type='text'
                        onClick={() => {
                            setDataValue(`${parentKey}.children.${currentLength}`, generateNewChild(siblings))
                            setDataValue(`${parentKey}.children.${currentLength + 1}`, {
                                key: `${parentKey}.${currentLength + 1}`,
                                index: 'add'
                            })
                        }}
                    >
                    </Button>
                </div>
            )
        } else {
            obj.children = (
                <div className={clsx({ 'index-child-row': !!childKey })}>
                    {isChild && (
                        <Popconfirm
                            cancelButtonProps={{ className: 'pop-confirm__btn' }}
                            okButtonProps={{ className: 'pop-confirm__btn' }}
                            title={
                                <div className='pop-confirm__tile'>
                                    <ExclamationCircleOutlined />
                                    Sure to delete?
                                </div>
                            }
                            icon={<></>}
                            onConfirm={() => {
                                onClickDeleteChild(record)
                            }}
                        >
                            <Button
                                className={clsx('delete-child-btn', hoverKey === record.key ? 'visible' : 'hidden')}
                                icon={<CloseOutlined className='btn--danger' />}
                                size='small'
                                type='text'
                            />
                        </Popconfirm>
                    )}
                    {record.index}
                </div>
            )
        }
        const editable = isEditing(record)
        if ((!childKey) && !editable) {
            obj.children = (
                <Space>
                    <Popover
                        visible={visibleKey === record.key}
                        onVisibleChange={visible => handleVisibleChange(visible, record.key)}
                        content={
                            <div className='bnl1-popover'>
                                <Button
                                    type='text'
                                    className='btn--danger'
                                    onClick={() => {
                                        confirm(record)
                                        hide()
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button type='text'>Config</Button>
                            </div>
                        }
                        trigger={editingKey === '' ? 'click' : ''}
                    >
                        <Button icon={<MoreOutlined />} type='text' disabled={editingKey !== '' }
                        style = {{'margin-left':'-16px'}}
                        className={record.key === 'special' ? 'hidden' : 'visible'} />
                        {record.index}
                    </Popover>
                </Space>
            )
        } else if (!childKey && editable) {
            obj.children = (
                <Space size='middle'>
                    <Button onClick={cancel} size='small'>
                        Hủy
                    </Button>
                    <Button type='primary' size='small' onClick={save}>
                        {addMode ? 'Thêm' : 'Lưu'}
                    </Button>
                </Space>
            )
        }
        return obj
    }
    const [hoverTenSp, setHoverTenSp] = useState(false)
    const [editTenSp, setEditTenSp] = useState(false)
    const [keyEdit, setKeyEdit] = useState(0)
    const renderTenSp = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editTenSp) {
            return <div>
                <span className='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {
                    setKeyEdit(record.key)
                    setEditTenSp(true)}} style={(hoverKey == record.key && hoverTenSp && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (childKey && editTenSp && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.tensp`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditTenSp(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditTenSp(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editTenSp) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="mr-5px">{text}</span>
                </div>
            )
        }
    }
    const [editName, setEditName] = useState(false)
    const renderName= (text, record ) => {
        const [parentKey, childKey] = record.key.split('.')
        if (childKey && !editName) {
            return <div className ='title__infor' >
                <span>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditName(true)}} style={(record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (parentKey && !editName) {
            return <div className ='title__infor' >
                <span>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditName(true)}} style={(record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (parentKey && editName && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__nameEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.name`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditName(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditName(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editName && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__nameEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.name`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditName(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditName(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if ((childKey || parentKey) && editName) {
            return (
                <div className="d-flex flex-row jus-content--right">
                    <span className="mr-5px">{text}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            size="small"
                        ></Button>
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
    }
    const [hoverDVT, setHoverDVT] = useState(false)
    const [editDVT, setEditDVT] = useState(false)
    const renderDVT = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editDVT) {
            return <div>
                <span className ='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditDVT(true)}} style={(hoverKey == record.key && hoverDVT && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (childKey && editDVT && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        // maxLength={10}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.dvt`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditDVT(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditDVT(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editDVT) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="mr-5px">{text}</span>
                </div>
            )
        }
    }

    const [hoverChuan, setHoverChuan] = useState(false)
    const [editChuan, setEditChuan] = useState(false)
    const renderChuan = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editChuan) {
            return <div>
                <span className='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditChuan(true)}} style={(hoverKey == record.key && hoverChuan && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (childKey && editChuan && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="number"
                        value={text}
                        // maxLength={10}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.chuan`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditChuan(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditChuan(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editChuan) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="mr-5px">{text}</span>
                </div>
            )
        }
    }

    const renderThemGio = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        if (childKey) {
            const heSoChuan = parseFloat(data[parentKey - 1].children[childKey - 1].chuan)
            if (heSoChuan) {
                const newVal = heSoChuan * 1.2
                return <div>{newVal}</div>
            }
        }
        return text
    }

    const renderCaDem = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        if (childKey) {
            const heSoChuan = parseFloat(data[parentKey - 1].children[childKey - 1].chuan)
            if (heSoChuan) {
                const newVal = heSoChuan * 1.1
                return <div>{newVal}</div>
            }
        }
        return text
    }

    const renderNgayNghi = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        if (childKey) {
            const heSoChuan = parseFloat(data[parentKey - 1].children[childKey - 1].chuan)
            if (heSoChuan) {
                const newVal = heSoChuan * 1.2
                return <div>{newVal}</div>
            }
        }
        return text
    }

    const renderNghiLe = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        if (childKey) {
            const heSoChuan = parseFloat(data[parentKey - 1].children[childKey - 1].chuan)
            if (heSoChuan) {
                const newVal = heSoChuan * 1.5
                return <div>{newVal}</div>
            }
        }
        return text
    }

    const renderKiemNhiem = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        if (childKey) {
            const heSoChuan = parseFloat(data[parentKey - 1].children[childKey - 1].chuan)
            if (heSoChuan) {
                const newVal = heSoChuan * 0.8
                return <div>{newVal}</div>
            }
        }
        return text
    }

    const [hoverNangSuat, setHoverNangSuat] = useState(false)
    const [editNangSuat, setEditNangSuat] = useState(false)
    const renderNangSuat = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        // if (!childKey) {
        //     return `${text}`
        // }
        if ((childKey || parentKey) && !editNangSuat) {
            return <div>
                <span className='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditNangSuat(true)}} style={(hoverKey == record.key && hoverNangSuat && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (parentKey && editNangSuat && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.nangsuat`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditNangSuat(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditNangSuat(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editNangSuat && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        // maxLength={10}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.nangsuat`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditNangSuat(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditNangSuat(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editNangSuat) {
            return (
                <div className="d-flex flex-row jus-content--center">
                <span className="mr-5px">{text}</span>
            </div>
            )
        }
    }

    const [hoverNgayCong, setHoverNgayCong] = useState(false)
    const [editNgayCong, setEditNgayCong] = useState(false)
    const renderNgayCong = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        // if (!childKey) {
        //     return `${text}`
        // }
        if ((childKey || parentKey) && !editNgayCong) {
            return <div>
                <span className='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditNgayCong(true)}} style={(hoverKey == record.key && hoverNgayCong && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (childKey && editNgayCong && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        // maxLength={10}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.ngaycong`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditNgayCong(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditNgayCong(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (parentKey && editNgayCong && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.ngaycong`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditNgayCong(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditNgayCong(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if ((childKey || parentKey) && editNgayCong) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="mr-5px">{text}</span>
                </div>
            )
        }
    }

    const [hoverDinhBien, setHoverDinhBien] = useState(false)
    const [editDinhBien, setEditDinhBien] = useState(false)
    const renderDinhBien = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        // if (!childKey) {
        //     return `${text}`
        // }
        if ((childKey || parentKey) && !editDinhBien) {
            return <div>
                <span className='pl-20px'>{text}</span>
                <Button className='btn__editInstant border-0' icon={<Pen></Pen>} onClick={() => {setKeyEdit(record.key)
                    setEditDinhBien(true)}} style={(hoverKey == record.key && hoverDinhBien && record.index !== 'add') ? { opacity : '1' } : { opacity: '0' }}></Button>
            </div>
        }
        if (parentKey && editDinhBien && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.dinhbien`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditDinhBien(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditDinhBien(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editDinhBien && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__cellEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        // maxLength={10}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.dinhbien`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditDinhBien(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditDinhBien(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editDinhBien) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="mr-5px">{text}</span>
                </div>
            )
        }
    }
    const columns = [
        {
            title: '',
            dataIndex: 'index',
            align: 'center',
            colSpan: 0,
            fixed: 'left',
            width: 50,
            className: 'cell--border-right',
            render: renderIndex
        },
        {
            title: titleTableList.infor.isClicked ? (
                <div className="d-flex flex-row">
                    <span style={{ 'padding-top':'4px' }}>Thông tin quản trị: </span>
                    <Input
                        className="editInput input__inforEdit input--hideArrow txt-right"
                        autoFocus
                        onFocus={event => event.target.select()}
                        value={titleTableList.infor.title}
                        onChange={event => {
                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                            newTitleTableList.infor.title = event.target.value
                            setTitleTableList(newTitleTableList)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                handleTitleTableCancel('infor')
                            }}
                            size="small"
                        ></Button>
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                handleTitleTableSave('infor')
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            ) : (
            <div className='title__infor'>
                Thông tin quản trị: {titleTableList.infor.title}
                <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                    newTitleTableList.infor.isClicked = true
                    setTitleTableList(newTitleTableList)
                    }}/>
                </div>
            ),
            onHeaderCell: () => ({
                onMouseEnter: () => {
                    setTitleTableList(preState => {
                    const newTitleTableList = JSON.parse(JSON.stringify(preState))
                    newTitleTableList.infor.isHovered = true
                    return newTitleTableList
                    })
                },
                onMouseLeave: () => {
                setTitleTableList(preState => {
                    const newTitleTableList = JSON.parse(JSON.stringify(preState))
                    newTitleTableList.infor.isHovered = false
                    return newTitleTableList
                    })
                }
            }),
            className: 'cell--border-right',
            align: 'left',
            fixed: 'left',
            colSpan: 2,
            children: [
                {
                    title: titleTableList.wattage.isClicked ? (
                        <div className="d-flex flex-row">
                            <span style={{ 'padding-top':'4px' }}>Quỹ lương khoán: </span>
                            <Input
                                className="editInput input__wattageEdit input--hideArrow txt-right"
                                autoFocus
                                onFocus={event => event.target.select()}
                                value={titleTableList.wattage.title}
                                onChange={event => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                    newTitleTableList.wattage.title = event.target.value
                                    setTitleTableList(newTitleTableList)
                                }}
                            />
                            <div className="d-flex flex-column mr-0 ml-auto">
                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={
                                        <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                                    }
                                    onClick={() => {
                                        handleTitleTableCancel('wattage')
                                    }}
                                    size="small"
                                ></Button>
                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                                    onClick={() => {
                                        handleTitleTableSave('wattage')
                                    }}
                                    size="small"
                                ></Button>
                            </div>
                        </div>
                    ) : (
                    <div className='title__infor'>
                        Quỹ lương khoán: {titleTableList.wattage.title}
                        <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                            newTitleTableList.wattage.isClicked = true
                            setTitleTableList(newTitleTableList)
                        }}/>
                    </div>
                    ),
                    onHeaderCell: () => ({
                        onMouseEnter: () => {
                            setTitleTableList(preState => {
                            const newTitleTableList = JSON.parse(JSON.stringify(preState))
                            newTitleTableList.wattage.isHovered = true
                            return newTitleTableList
                            })
                        },
                        onMouseLeave: () => {
                        setTitleTableList(preState => {
                            const newTitleTableList = JSON.parse(JSON.stringify(preState))
                            newTitleTableList.wattage.isHovered = false
                            return newTitleTableList
                            })
                        }
                    }),
                    align: 'left',
                    colSpan: 2,
                    className: 'cell--border-right',
                    children: [
                        {
                            title: titleTableList.budget.isClicked ? (
                                <div className="d-flex flex-row">
                                    <span style={{ 'padding-top':'4px' }}>Công suất: </span>
                                    <Input
                                        className="editInput input__budgetEdit input--hideArrow txt-right"
                                        autoFocus
                                        onFocus={event => event.target.select()}
                                        value={titleTableList.budget.title}
                                        onChange={event => {
                                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                            newTitleTableList.budget.title = event.target.value
                                            setTitleTableList(newTitleTableList)
                                        }}
                                    />
                                    <div className="d-flex flex-column mr-0 ml-auto">
                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                                            }
                                            onClick={() => {
                                                handleTitleTableCancel('budget')
                                            }}
                                            size="small"
                                        ></Button>
                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                                            onClick={() => {
                                                handleTitleTableSave('budget')
                                            }}
                                            size="small"
                                        ></Button>
                                    </div>
                                </div>
                            ) : (
                            <div className='title__infor'>
                                Công suất: {titleTableList.budget.title}
                                <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                    newTitleTableList.budget.isClicked = true
                                    setTitleTableList(newTitleTableList)
                                }}/>
                            </div>
                            ),
                            onHeaderCell: () => ({
                                onMouseEnter: () => {
                                    setTitleTableList(preState => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                    newTitleTableList.budget.isHovered = true
                                    return newTitleTableList
                                    })
                                },
                                onMouseLeave: () => {
                                setTitleTableList(preState => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                    newTitleTableList.budget.isHovered = false
                                    return newTitleTableList
                                    })
                                }
                            }),
                            align: 'left',
                            colSpan: 2,
                            className: 'cell--border-right',
                            children: [
                                {
                                    title: 'Ngày   | Tháng   | Quý   | Năm',
                                    dataIndex: 'name',
                                    fixed: 'left',
                                    width: 250,
                                    align: 'left',
                                    colSpan: 2,
                                    className: 'cell--border-right',
                                    render: renderName
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'BẢNG ĐƠN GIÁ LƯƠNG KHOÁN LƯƠNG SẢN XUẤT THEO VỊ TRÍ',
            className: 'cell--border-right',
            children: [
                {
                    title: 'Sản phẩm tiêu chuẩn',
                    className: 'cell--border-right',
                    onHeaderCell: () => ({
                        className: 'cell--border-top'
                    }),
                    children: [
                        {
                            title: 'Tên SP (kết quả CV)',
                            dataIndex: 'tensp',
                            width: 120,
                            align: 'center',
                            className: 'cell--border-right',
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderTenSp,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverTenSp(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverTenSp(false)
                                    }
                                }
                            }
                        },
                        {
                            title: 'ĐVT',
                            dataIndex: 'dvt',
                            key: '',
                            align: 'center',
                            width: 80,
                            className: 'cell--border-right',
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderDVT,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverDVT(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverDVT(false)
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    title: 'Định mức (Đơn giá khoán)',
                    dataIndex: '',
                    align: 'center',
                    className: 'cell--border-right',
                    onHeaderCell: () => ({ className: 'cell--border-top' }),
                    children: [
                        {
                            title: 'Chuẩn 1',
                            dataIndex: 'chuan',
                            align: 'center',
                            width: 70,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderChuan,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverChuan(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverChuan(false)
                                    }
                                }
                            }
                        },
                        {
                            title: 'Thêm giờ 1.2',
                            dataIndex: 'themgio',
                            align: 'center',
                            width: 70,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderThemGio
                        },
                        {
                            title: 'Ca đêm 1.1',
                            dataIndex: 'cadem',
                            align: 'center',
                            width: 70,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderCaDem
                        },
                        {
                            title: 'Ngày nghỉ 1.2',
                            dataIndex: 'ngaynghi',
                            align: 'center',
                            width: 70,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderNgayNghi
                        },
                        {
                            title: 'Ngày lễ 1.5',
                            dataIndex: 'ngayle',
                            align: 'center',
                            width: 70,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderNghiLe
                        },
                        {
                            title: 'Kiêm nhiệm 0.8',
                            dataIndex: 'kiemnhiem',
                            align: 'center',
                            width: 70,
                            className: 'cell--border-right',
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderKiemNhiem
                        }
                    ]
                },
                {
                    title: 'Tham chiếu',
                    dataIndex: 'kpiPercent',
                    align: 'center',
                    className: 'cell--border-right ',
                    onHeaderCell: () => ({ className: 'cell--border-top' }),
                    children: [
                        {
                            title: 'Giờ công/1 ngày',
                            dataIndex: 'ngaycong',
                            key: 'ngaycong',
                            align: 'center',
                            width: 80,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderNgayCong,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverNgayCong(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverNgayCong(false)
                                    }
                                }
                            }
                        },
                        {
                            title: 'Năng suất tiêu chuẩn',
                            dataIndex: 'nangsuat',
                            key: 'nangsuat',
                            align: 'center',
                            width: 100,
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderNangSuat,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverNangSuat(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverNangSuat(false)
                                    }
                                }
                            }
                        },
                        {
                            title: 'Định biên',
                            dataIndex: 'dinhbien',
                            align: 'center',
                            width: 100,
                            className: 'cell--border-right',
                            onHeaderCell: () => ({ className: 'cell--border-top' }),
                            render: renderDinhBien,
                            onCell: () => {
                                return {
                                    onMouseEnter: () => {
                                        setHoverDinhBien(true)
                                    },
                                    onMouseLeave: () => {
                                        setHoverDinhBien(false)
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
          },
        {
            title: 'Quy tắc áp dung',
            align: 'left',
            className: 'cell--border-right',
            onHeaderCell: () => ({ className: 'thead__title-color' }),
            children: [
                    {
                        title: titleTableList.rules1.isClicked ? (
                            <div className="d-flex flex-row">
                                <Input
                                    className="editInput input__inforEdit input--hideArrow txt-right"
                                    autoFocus
                                    onFocus={event => event.target.select()}
                                    value={titleTableList.rules1.title}
                                    onChange={event => {
                                        const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                        newTitleTableList.rules1.title = event.target.value
                                        setTitleTableList(newTitleTableList)
                                    }}
                                />
                                <div className="d-flex flex-column mr-0 ml-auto">
                                    <Button
                                        className="btn__editInstant border-0 btn--wh10px"
                                        icon={
                                            <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                                        }
                                        onClick={() => {
                                            handleTitleTableCancel('rules1')
                                        }}
                                        size="small"
                                    ></Button>
                                    <Button
                                        className="btn__editInstant border-0 btn--wh10px"
                                        icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                                        onClick={() => {
                                            handleTitleTableSave('rules1')
                                        }}
                                        size="small"
                                    ></Button>
                                </div>
                            </div>
                        ) : (
                        <div className='title__infor thead__title-color'>
                            {titleTableList.rules1.title}
                            <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                                const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                newTitleTableList.rules1.isClicked = true
                                setTitleTableList(newTitleTableList)
                                console.log(456)
                                }}/>
                            </div>
                        ),
                        onHeaderCell: () => ({
                            onMouseEnter: () => {
                                setTitleTableList(preState => {
                                const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                newTitleTableList.rules1.isHovered = true
                                return newTitleTableList
                                })
                            },
                            onMouseLeave: () => {
                            setTitleTableList(preState => {
                                const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                newTitleTableList.rules1.isHovered = false
                                return newTitleTableList
                                })
                            }
                    }),
                    align: 'left',
                    className: 'cell--border-right',
                    // onHeaderCell: () => ({ className: 'thead__title-color' }),
                    children: [
                            {
                                title: titleTableList.rules2.isClicked ? (
                                    <div className="d-flex flex-row">
                                        <Input
                                            className="editInput input__inforEdit input--hideArrow txt-right"
                                            autoFocus
                                            onFocus={event => event.target.select()}
                                            value={titleTableList.rules2.title}
                                            onChange={event => {
                                                const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                                newTitleTableList.rules2.title = event.target.value
                                                setTitleTableList(newTitleTableList)
                                            }}
                                        />
                                        <div className="d-flex flex-column mr-0 ml-auto">
                                            <Button
                                                className="btn__editInstant border-0 btn--wh10px"
                                                icon={
                                                    <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                                                }
                                                onClick={() => {
                                                    handleTitleTableCancel('rules2')
                                                }}
                                                size="small"
                                            ></Button>
                                            <Button
                                                className="btn__editInstant border-0 btn--wh10px"
                                                icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                                                onClick={() => {
                                                    handleTitleTableSave('rules2')
                                                }}
                                                size="small"
                                            ></Button>
                                        </div>
                                    </div>
                                ) : (
                                <div className='title__infor thead__title-color'>
                                    {titleTableList.rules2.title}
                                    <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                                        const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                        newTitleTableList.rules2.isClicked = true
                                        setTitleTableList(newTitleTableList)
                                        console.log(456)
                                        }}/>
                                    </div>
                                ),
                                onHeaderCell: () => ({
                                    onMouseEnter: () => {
                                        setTitleTableList(preState => {
                                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                        newTitleTableList.rules2.isHovered = true
                                        return newTitleTableList
                                        })
                                    },
                                    onMouseLeave: () => {
                                    setTitleTableList(preState => {
                                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                        newTitleTableList.rules2.isHovered = false
                                        return newTitleTableList
                                        })
                                    }
                            }),
                            width: 250,
                            align: 'left',
                            className: 'cell--border-right',
                            children:[{
                                    title: titleTableList.rules3.isClicked ? (
                                        <div className="d-flex flex-row">
                                            <Input
                                                className="editInput input__inforEdit input--hideArrow txt-right"
                                                autoFocus
                                                onFocus={event => event.target.select()}
                                                value={titleTableList.rules3.title}
                                                onChange={event => {
                                                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                                    newTitleTableList.rules3.title = event.target.value
                                                    setTitleTableList(newTitleTableList)
                                                }}
                                            />
                                            <div className="d-flex flex-column mr-0 ml-auto">
                                                <Button
                                                    className="btn__editInstant border-0 btn--wh10px"
                                                    icon={
                                                        <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                                                    }
                                                    onClick={() => {
                                                        handleTitleTableCancel('rules3')
                                                    }}
                                                    size="small"
                                                ></Button>
                                                <Button
                                                    className="btn__editInstant border-0 btn--wh10px"
                                                    icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                                                    onClick={() => {
                                                        handleTitleTableSave('rules3')
                                                    }}
                                                    size="small"
                                                ></Button>
                                            </div>
                                        </div>
                                    ) : (
                                    <div className='title__infor thead__title-color'>
                                        {titleTableList.rules3.title}
                                        <Button className='btn__editTitle' icon={<Pen></Pen>} onClick={() => {
                                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                            newTitleTableList.rules3.isClicked = true
                                            setTitleTableList(newTitleTableList)
                                            console.log(456)
                                            }}/>
                                        </div>
                                    ),
                                    onHeaderCell: () => ({
                                        onMouseEnter: () => {
                                            setTitleTableList(preState => {
                                            const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                            newTitleTableList.rules3.isHovered = true
                                            return newTitleTableList
                                            })
                                        },
                                        onMouseLeave: () => {
                                        setTitleTableList(preState => {
                                            const newTitleTableList = JSON.parse(JSON.stringify(preState))
                                            newTitleTableList.rules3.isHovered = false
                                            return newTitleTableList
                                            })
                                        }
                                }),
                                width: 250,
                                align: 'left',
                                className: 'cell--border-right',
                                dataIndex: 'ghiChu',
                                onCell: (record) => {
                                    const [parent, childKey] = record.key.split('.')
                                    if (!childKey) {
                                        return { rowSpan: 2 }
                                    }
                                }
                            }]
                        }
                    ]
                }
            ]
        }
    ]

    return {
        columns
    }
}
