/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import {
    CloseOutlined,
    DownOutlined,
    MoreOutlined,
    SortAscendingOutlined,
    UpOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    CheckOutlined
} from '@ant-design/icons'
import { Button, Input, Popconfirm, Popover, Space, Modal } from 'antd'
import React from 'react'
import {
    calculateHeSo,
    formatCurrency,
    generateNewChild,
    getNgachLuongInfo,
    getNumChild
} from 'utils/PayGrades02Helper'
import Pen from 'pages/pay-grades/components/Pen'
import ArrowUp from 'pages/pay-grades/components/ArrowUp'
import ArrowDown from 'pages/pay-grades/components/ArrowDown'
export const useColumns = ({
    addMode,
    onClickDeleteChild,
    isEditMode,
    hoverKey,
    listCellNeedUpdate,
    setDataValue,
    luongKhoiDiem,
    data,
    setData,
    isEditing,
    expandedKeys,
    toggleExpandedKeys,
    editingKey,
    edit,
    save,
    cancel,
    deleteSection,
    toUp,
    toDown,
    initialDataRef,
    getCloneData
}) => {
    const [dataCurrent, setDataCurrent] = useState(initialDataRef.current)
    const confirm = (record) => {
        Modal.confirm({
            title: 'Confirm delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete this section?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: (close) => {
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
    const [editNL, setEditNL] = useState(false)
    const [editApply, setEditApply] = useState(false)
    const renderNgachLuong = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: text, props: {} }

        // parent row
        if (!childKey) {
            obj.children = (
                <Space>
                    <Button
                        icon={expandedKeys.includes(record.key) ? <UpOutlined /> : <DownOutlined />}
                        type="text"
                        onClick={() => toggleExpandedKeys(record.key)}
                    />
                    <span className="d-flex flex-row">
                        <Button
                            icon={<ArrowUp></ArrowUp>}
                            onClick={() => toUp(record.key)}
                            type="text"
                            className={record.key == 1 ? 'btn--width90Percent btn--opacity03' : 'btn--width90Percent'}
                            disabled={record.key == 1}
                        ></Button>
                        <Button
                            icon={<ArrowDown></ArrowDown>}
                            onClick={() => toDown(record.key)}
                            type="text"
                            className={record.key == data.length ? 'btn--opacity03' : ''}
                            disabled={record.key == data.length}
                        ></Button>
                    </span>
                    <Popover
                        visible={visibleKey === record.key}
                        onVisibleChange={(visible) => handleVisibleChange(visible, record.key)}
                        content={
                            <div className="bnl1-popover">
                                <Button
                                    type="text"
                                    className="btn--danger"
                                    onClick={() => {
                                        confirm(record)
                                        hide()
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button type="text">Config</Button>
                                <Button
                                    onClick={() => {
                                        edit(record)
                                        hide()
                                    }}
                                    type="text"
                                >
                                    Edit
                                </Button>
                            </div>
                        }
                        trigger={editingKey === '' ? 'click' : ''}
                    >
                        <Button icon={<MoreOutlined />} type="text" disabled={editingKey !== ''} />
                    </Popover>
                </Space>
            )
        }

        // child row
        else if (childKey === '1') {
            obj.props.rowSpan = getNumChild(data, parentKey)
            if (!editNL && !editApply) {
                const [name, applyFor] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <>
                        {' '}
                        <div
                            className="d-flex flex-row"
                        >
                            <div className="ngach-luong-title mr-5px">{name}</div>
                            <Pen className='icon--wh12px' onClick={() => {
                                setKeyEdit(record.key)
                                setEditNL(true)
                            }}></Pen>
                        </div>
                        <br />
                        <div
                            className="d-flex flex-row"
                        >
                            <div className='mr-5px'>Áp dụng cho: {applyFor}</div>
                            <Pen className='icon--wh12px' onClick={() => {
                                setKeyEdit(record.key)
                                setEditApply(true)
                            }}></Pen>
                        </div>
                    </>
                )
            } else {
                const [name, applyFor] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <>
                        <div className="d-flex flex-row">
                            {editNL && keyEdit == record.key ? (
                                <>
                                    {' '}
                                    <Input.TextArea
                                        className="editInput"
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        value={data[parentKey - 1].salaryGrade}
                                        onChange={(e) => {
                                            setDataValue(`${parentKey}.salaryGrade`, e.target.value)
                                        }}
                                    />
                                    <div className="d-flex flex-column mr-0 ml-auto">
                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CloseOutlined
                                                    className="icon--wh10px"
                                                    style={{ color: '#FF494E80' }}
                                                ></CloseOutlined>
                                            }
                                            onClick={() => {
                                                cancel()
                                                setEditNL(false)
                                            }}
                                            size="small"
                                        ></Button>

                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CheckOutlined
                                                    className="icon--wh10px "
                                                    style={{ color: '#97c27d' }}
                                                ></CheckOutlined>
                                            }
                                            onClick={() => {
                                                save()
                                                setEditNL(false)
                                            }}
                                            size="small"
                                        ></Button>
                                    </div>
                                </>
                            ) : (
                                <div className="ngach-luong-title">{name}</div>
                            )}
                        </div>
                        <br />
                        Áp dụng cho:
                        <div className="d-flex flex-row">
                            {editApply && keyEdit == record.key ? (
                                <>
                                    <Input.TextArea
                                        className="editInput"
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        value={data[parentKey - 1].applyFor}
                                        onChange={(e) => {
                                            setDataValue(`${parentKey}.applyFor`, e.target.value)
                                        }}
                                    />
                                    <div className="d-flex flex-column mr-0 ml-auto">
                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CloseOutlined
                                                    className="icon--wh10px"
                                                    style={{ color: '#FF494E80' }}
                                                ></CloseOutlined>
                                            }
                                            onClick={() => {
                                                cancel()
                                                setEditApply(false)
                                            }}
                                            size="small"
                                        ></Button>

                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CheckOutlined
                                                    className="icon--wh10px"
                                                    style={{ color: '#97c27d' }}
                                                ></CheckOutlined>
                                            }
                                            onClick={() => {
                                                save()
                                                setEditApply(false)
                                            }}
                                            size="small"
                                        ></Button>
                                    </div>
                                </>
                            ) : (
                                <div>a</div>
                            )}
                        </div>
                    </>
                )
            }
        } else {
            obj.props.rowSpan = 0
        }

        return obj
    }

    const [editHeSo, setEditHeSo] = useState(false)
    const [editStep, setEditStep] = useState(false)
    const renderHeSo = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (!childKey && !editHeSo && !editStep) {
            return (
                <span className="he-so">
                    <span className="he-so__avg">{record.coefficient[0]}</span><Pen className='icon--wh12px' onClick={() => {
                        setKeyEdit(record.key)

                        setEditHeSo(true)
                    }}></Pen>|
                    <span className="he-so__jump">{record.coefficient[1]}</span><Pen className='icon--wh12px' onClick={() => {
                        setKeyEdit(record.key)

                        setEditStep(true)
                    }}></Pen>
                </span>
            )
        }
        if (!childKey && (editHeSo || editStep)) {
            return (
                <div className="child--flex-row jus-content--center align-items--center">
                    <span className="he-so">
                        {editHeSo && record.key == keyEdit ? <div className='d-flex flex-row'>
                            <Input
                                type="number"
                                step="0.1"
                                value={data[parentKey - 1].coefficient[0]}
                                className="editInput__he-so input--hideArrow"
                                onChange={(e) => {
                                    setDataValue(`${parentKey}.coefficient`, [
                                        e.target.value,
                                        data[parentKey - 1].coefficient[1]
                                    ])
                                    setDataValue(`${parentKey}.coefficientAvg`, e.target.value)
                                }}
                            />
                            <div className="d-flex flex-column mr-0 ml-auto">
                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={
                                        <CloseOutlined
                                            className="icon--wh10px"
                                            style={{ color: '#FF494E80' }}
                                        ></CloseOutlined>
                                    }
                                    onClick={() => {
                                        cancel()
                                        setEditHeSo(false)
                                    }}
                                    size="small"
                                ></Button>

                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={
                                        <CheckOutlined
                                            className="icon--wh10px"
                                            style={{ color: '#97c27d' }}
                                        ></CheckOutlined>
                                    }
                                    onClick={() => {
                                        save()
                                        setEditHeSo(false)
                                    }}
                                    size="small"
                                ></Button>
                            </div>
                        </div>:
                            <span className="he-so__avg">{record.coefficient[0]}|</span>}
                    </span>

                    <span className="he-so">
                        {editStep && record.key == keyEdit ? <div className='d-flex flex-row'>
                            <Input
                                type="number"
                                step="0.1"
                                value={data[parentKey - 1].coefficient[1]}
                                className="editInput__he-so input--hideArrow"
                                onChange={(e) => {
                                    setDataValue(`${parentKey}.coefficient`, [
                                        data[parentKey - 1].coefficient[0],
                                        e.target.value
                                    ])
                                // setDataValue(`${parentKey}.coefficientAvg`, e);
                                }}
                            />
                            <div className="d-flex flex-column mr-0 ml-auto">
                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={
                                        <CloseOutlined
                                            className="icon--wh10px"
                                            style={{ color: '#FF494E80' }}
                                        ></CloseOutlined>
                                    }
                                    onClick={() => {
                                        cancel()
                                        setEditStep(false)
                                    }}
                                    size="small"
                                ></Button>

                                <Button
                                    className="btn__editInstant border-0 btn--wh10px"
                                    icon={
                                        <CheckOutlined
                                            className="icon--wh10px"
                                            style={{ color: '#97c27d' }}
                                        ></CheckOutlined>
                                    }
                                    onClick={() => {
                                        save()
                                        setEditStep(false)
                                    }}
                                    size="small"
                                ></Button>
                            </div>
                        </div>:
                            <span className="he-so__jump">{record.coefficient[1]}</span>}
                    </span>
                </div>
            )
        }
        if (childKey) {
            let cellValue = text
            // if (editable) {
            const avg = data[parentKey - 1].coefficientAvg
            const jump = data[parentKey - 1].coefficient[1]
            cellValue = calculateHeSo(avg, jump, parseInt(childKey) - 1, getNumChild(data, parentKey) - 1).toFixed(1)
            const currentCellValue = data[parentKey - 1].children[childKey - 1].coefficient
            if (currentCellValue && cellValue.toString() !== currentCellValue.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.coefficient`, cellValue])
            }
            // }

            return <div>{cellValue}</div>
        }
    }

    const [editBL, setEditBL] = useState(false)
    const renderBacLuong = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: record.salaryScale, props: {} }
        const editable = isEditing(record)
        if (!childKey && !editBL) {
            return <>
                <span className='mr-5px'>{text}</span><Pen className='icon--wh12px' onClick={() => {
                    setKeyEdit(record.key)
                    setEditBL(true)
                }}></Pen>
            </>
        }
        if (!childKey && editBL) {
            return (
                <div className='d-flex flex-row jus-content--center'>
                    <Input
                        className="editInputBL"
                        maxLength={9}
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.salaryScale`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined
                                    className="icon--wh10px"
                                    style={{ color: '#FF494E80' }}
                                ></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditBL(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CheckOutlined
                                    className="icon--wh10px"
                                    style={{ color: '#97c27d' }}
                                ></CheckOutlined>
                            }
                            onClick={() => {
                                save()
                                setEditBL(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && text != 'add') {
            const newVal = `${data[parentKey - 1].salaryScale} - B${childKey}`
            const currentVal = text
            if (newVal !== currentVal && record.text !== 'add') {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.salaryScale`, newVal])
            }
            if (newVal !== currentVal && record.text == 'add') {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.salaryScale`, newVal])
            }
            return (
                <div className="d-flex flex-row pr-15px">
                    <div className="" style={hoverKey === record.key ? { opacity: 1 } : { opacity: 0 }}>
                        <Popconfirm
                            cancelButtonProps={{ className: 'pop-confirm__btn' }}
                            okButtonProps={{ className: 'pop-confirm__btn' }}
                            title="Chắc chắn xoá?"
                            onConfirm={() => {
                                if (isEditMode) {
                                    onClickDeleteChild(record)
                                    setDataValue(`${parentKey}.coefficient`, [
                                        data[parentKey - 1].coefficientAvg,
                                        data[parentKey - 1].coefficient[1]
                                    ])
                                } else {
                                    onClickDeleteChild(record)
                                    setDataValue(`${parentKey}.coefficient`, [
                                        data[parentKey - 1].coefficientAvg,
                                        data[parentKey - 1].coefficient[1]
                                    ])
                                }
                            }}
                        >
                            <CloseOutlined style={{ color: 'rgba(255, 73, 78, 0.5)', marginRight: 10 }} />
                        </Popconfirm>
                    </div>
                    <div className="mr-auto ml-auto">{`${data[parentKey - 1].salaryScale} - B${childKey}`}</div>
                </div>
            )
        }

        if (childKey && text === 'add') {
            const [parentKey] = record.key.split('.')
            obj.props.colSpan = 12
            const siblings = data[parentKey - 1].children
            const currentLength = siblings.length
            obj.children = (
                <div style={{ textAlign: 'left' }}>
                    <Button
                        icon={<PlusCircleOutlined style={{ color: '#32A1C8' }} />}
                        type="text"
                        onClick={() => {
                            setDataValue(`${parentKey}.children.${currentLength}`, generateNewChild(siblings))
                            setDataValue(`${parentKey}.children.${currentLength + 1}`, {
                                key: `${parentKey}.${currentLength + 1}`,
                                salaryScale: 'add'
                            })
                            if (currentLength > 8 && (currentLength - 8) % 2 === 1) {
                                setDataValue(
                                    `${parentKey}.coefficientAvg`,
                                    parseFloat(data[parentKey - 1].coefficientAvg) +
                                        parseFloat(data[parentKey - 1].coefficient[1])
                                )
                                setDataValue(`${parentKey}.coefficient`, [
                                    parseFloat(data[parentKey - 1].coefficientAvg),
                                    data[parentKey - 1].coefficient[1]
                                ])
                            }
                        }}
                    >
                        Thêm bậc lương
                    </Button>
                </div>
            )
        }
        return obj
    }

    const renderLVT = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey) {
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const renderVal = coefficient * luongKhoiDiem
            return <div>{formatCurrency(renderVal)}</div>
        }
        // if (childKey && editable) {
        //     const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient);
        //     const newVal = coefficient * luongKhoiDiem;
        //     const oldVal = data[parentKey - 1].children[childKey - 1].positionSalary;
        //     if (oldVal !== undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
        //         listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.positionSalary`, newVal]);
        //     }
        //     return <div>{formatCurrency(newVal)}</div>;
        // }
        return text
    }

    const renderLVTPC = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey && !editable) {
            const percentPC1 = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const percentPC2 = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const pc1 = coefficient * luongKhoiDiem * percentKpi * percentPC1
            const pc2 = coefficient * luongKhoiDiem * percentKpi * percentPC2
            const text = coefficient * luongKhoiDiem + pc1 + pc2
            return formatCurrency(text)
        }
        if (childKey && editable) {
            const percentPC1 = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const percentPC2 = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const pc1 = coefficient * luongKhoiDiem * percentKpi * percentPC1
            const pc2 = coefficient * luongKhoiDiem * percentKpi * percentPC2
            const newVal = coefficient * luongKhoiDiem + pc1 + pc2
            const oldVal = data[parentKey - 1].children[childKey - 1].positionSalaryHaveAllowance
            if (oldVal != undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([
                    `${parentKey}.children.${childKey}.positionSalaryHaveAllowance`,
                    newVal
                ])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const renderLkpi = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return (
                <div className="child--flex-row">
                    <span className="child__dash">|</span>
                    <span className="child__lbl-have-dash">{record.kpiSalary}</span>
                </div>
            )
        }
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey && !editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const text = coefficient * luongKhoiDiem * percent
            return formatCurrency(text)
        }
        if (childKey && editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const newVal = coefficient * luongKhoiDiem * percent
            const oldVal = data[parentKey - 1].children[childKey - 1].kpiSalary
            if (oldVal != undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.kpiSalary`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const renderLCB = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey && !editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const text = coefficient * luongKhoiDiem - coefficient * luongKhoiDiem * percent
            return formatCurrency(text)
        }
        if (childKey && editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const newVal = coefficient * luongKhoiDiem - coefficient * luongKhoiDiem * percent
            const oldVal = data[parentKey - 1].children[childKey - 1].basicSalary
            if (oldVal != undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.basicSalary`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const renderPC1 = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return (
                <div className="child--flex-row">
                    <span className="child__dash">|</span>
                    <span className="child__lbl-have-dash">{record.allowance}</span>
                </div>
            )
        }
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey && !editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const renderVal = coefficient * luongKhoiDiem * percent * percentKpi
            return formatCurrency(renderVal)
        }
        if (childKey && editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const newVal = coefficient * luongKhoiDiem * percent * percentKpi
            const oldVal = data[parentKey - 1].children[childKey - 1].allowance
            if (oldVal != undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.allowance`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const renderPC2 = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return (
                <div className="child--flex-row">
                    <span className="child__dash">|</span>
                    <span className="child__lbl-have-dash">{record.allowance2}</span>
                </div>
            )
        }
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey && !editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const renderVal = coefficient * luongKhoiDiem * percent * percentKpi
            return formatCurrency(renderVal)
        }
        if (childKey && editable) {
            const percent = parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const percentKpi = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const newVal = coefficient * luongKhoiDiem * percent * percentKpi
            const oldVal = data[parentKey - 1].children[childKey - 1].allowance2
            if (oldVal != undefined && newVal != undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.allowance2`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const [hoverKpi, setHoverKpi] = useState(false)
    const [editKpi, setEditKpi] = useState(false)
    const [keyEdit, setKeyEdit] = useState(0)
    const renderKpiPercent = (text, record) => {
        if (record.salaryScale === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span className='ml-25px'>{text}</span>
        }
        if (childKey && !editKpi) {
            return (
                <div className="txt-right">
                    <span className='mr-5px'>{text}</span>
                    <Pen className='icon--wh12px m-0' onClick={() => {
                        setKeyEdit(record.key)
                        setEditKpi(true)
                    }}
                    style={hoverKey == record.key && hoverKpi ? { opacity: '1' } : { opacity: '0' }} ></Pen>
                </div>
            )
        }
        if (childKey && editKpi && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-right"
                        type="number"
                        step={0.5}
                        value={text}
                        maxLength={3}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.kpiPercent`, e.target.value)
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
                                setEditKpi(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditKpi(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editKpi) {
            return (
                <div className="d-flex flex-row jus-content--right">
                    <span className="mr-5px">{text}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0">
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

    const [hoverPC1, setHoverPC1] = useState(false)
    const [editPC1, setEditPC1] = useState(false)
    const renderAllowancePercent1 = (text, record) => {
        if (record.salaryScale === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span className='ml-25px'>{text}</span>
        }
        if (childKey && !editPC1) {
            return (
                <div className="txt-right">
                    <span className='mr-5px'>{text}</span>
                    <Pen className='icon--wh12px m-0' onClick={() => {
                        setKeyEdit(record.key)
                        setEditPC1(true)
                    }}
                    style={hoverKey == record.key && hoverPC1 ? { opacity: '1' } : { opacity: '0' }} ></Pen>
                </div>
            )
        }
        if (childKey && editPC1 && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-right"
                        type="number"
                        step={0.5}
                        value={text}
                        maxLength={3}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.allowancePercent1`, e.target.value)
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
                                setEditPC1(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditPC1(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editPC1) {
            return (
                <div className="d-flex flex-row jus-content--right">
                    <span className="mr-5px">{text}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0">
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

    const [hoverPC2, setHoverPC2] = useState(false)
    const [editPC2, setEditPC2] = useState(false)
    const renderAllowancePercent2 = (text, record) => {
        if (record.salaryScale === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span className='ml-25px'>{text}</span>
        }
        if (childKey && !editPC2) {
            return (
                <div className="txt-right">
                    <span className='mr-5px'>{text}</span>
                    <Pen className='icon--wh12px m-0' onClick={() => {
                        setKeyEdit(record.key)
                        setEditPC2(true)
                    }}
                    style={hoverKey == record.key && hoverPC2 ? { opacity: '1' } : { opacity: '0' }} ></Pen>
                </div>
            )
        }
        if (childKey && editPC2 && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-right"
                        type="number"
                        step={0.5}
                        value={text}
                        maxLength={3}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.allowancePercent2`, e.target.value)
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
                                setEditPC2(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditPC2(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editPC2) {
            return (
                <div className="d-flex flex-row jus-content--right">
                    <span className="mr-5px">{text}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0">
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

    const [hoverNote, setHoverNote] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const renderNote = (text, record) => {
        if (record.salaryScale === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editNote) {
            return (
                <div className="txt-right">
                    <span>{text}</span>
                    <Button
                        className="btn__editInstant border-0"
                        icon={<Pen></Pen>}
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditNote(true)
                        }}
                        style={hoverKey == record.key && hoverNote ? { opacity: '1' } : { opacity: '0' }}
                    ></Button>
                </div>
            )
        }
        if (childKey && editNote && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-right"
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.note`, e.target.value)
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
                                setEditNote(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditNote(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editNote) {
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

    const columns = [
        {
            title: 'Ngạch lương',
            dataIndex: 'salaryGrade',
            editable: true,
            render: renderNgachLuong,
            width: '8%',
            onHeaderCell: () => ({
                fixed: 'left'
            }),
            fixed: 'left'
        },
        {
            title: 'Bậc lương',
            dataIndex: 'salaryScale',
            align: 'center',
            editable: true,
            render: renderBacLuong,
            width: '13%',
            onHeaderCell: () => ({
                className: 'cell--max-width-120',
                fixed: 'left'
            }),
            fixed: 'left'
        },
        {
            title: 'Hệ số',
            dataIndex: 'coefficient',
            align: 'center',
            editable: true,
            render: renderHeSo,
            width: '8%',
            onCell: (record) => ({
                colSpan: record.basicSalary == undefined ? 0 : '',
                className: ' cell--height-24px'
            }),
            onHeaderCell: () => ({
                fixed: 'left'
            }),
            fixed: 'left'
        },
        {
            title: 'Lương cơ bản',
            colSpan: 1,
            dataIndex: 'basicSalary',
            align: 'center',
            render: renderLCB,
            className: 'cell--border-right',
            width: '8%',
            onCell: (record) => ({
                colSpan: record.basicSalary == undefined ? 0 : ''
            }),
            onHeaderCell: () => ({
                fixed: 'left'
            }),
            fixed: 'left'
        },
        {
            title: () => {
                return (
                    <div>
                        <span>Lương KPI</span>
                        <br />
                        <span>(Tính theo LCB hoặc lương khởi điểm / hoặc lương tối thiểu)</span>
                    </div>
                )
            },
            colSpan: 2,
            dataIndex: 'kpiPercent',
            align: 'center',
            onHeaderCell: () => ({ className: 'cell--border-right cell--max-width-120' }),
            width: '6%',
            render: renderKpiPercent,
            onCell: (record) => ({
                colSpan: record.kpiPercent == undefined ? 0 : '',
                onMouseEnter: () => {
                    setHoverKpi(true)
                },
                onMouseLeave: () => {
                    setHoverKpi(false)
                }
            })
        },
        {
            title: 'LKPI',
            colSpan: 0,
            dataIndex: 'kpiSalary',
            align: 'center',
            className: 'cell--border-right',
            render: renderLkpi,
            width: '8%',
            onCell: (record) => {
                if (record.kpiSalary == undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: () => {
                return (
                    <div>
                        <span>Phụ cấp 01</span>
                        <br />
                        <span>(Trách nhiệm)</span>
                    </div>
                )
            },
            colSpan: 2,
            dataIndex: 'allowancePercent1',
            align: 'center',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            width: '5%',
            render: renderAllowancePercent1,
            onCell: (record) => ({
                colSpan: record.allowancePercent1 == undefined ? 0 : '',
                onMouseEnter: () => {
                    setHoverPC1(true)
                },
                onMouseLeave: () => {
                    setHoverPC1(false)
                }
            })
        },
        {
            title: '',
            colSpan: 0,
            dataIndex: 'allowance',
            align: 'center',
            className: 'cell--border-right',
            render: renderPC1,
            width: '8%',
            onCell: (record) => {
                if (record.allowance == undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: () => {
                return (
                    <div>
                        <span>Phụ cấp 02</span>
                        <br />
                        <span>(Kỹ thuật, nghiệp vụ)</span>
                    </div>
                )
            },
            colSpan: 2,
            dataIndex: 'allowancePercent2',
            align: 'center',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            width: '5%',
            render: renderAllowancePercent2,
            onCell: (record) => ({
                colSpan: record.allowancePercent2 == undefined ? 0 : '',
                onMouseEnter: () => {
                    setHoverPC2(true)
                },
                onMouseLeave: () => {
                    setHoverPC2(false)
                }
            })
        },
        {
            title: '',
            colSpan: 0,
            dataIndex: 'allowance2',
            align: 'center',
            className: 'cell--border-right',
            render: renderPC2,
            width: '8%',
            onCell: (record) => {
                if (record.allowance2 == undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: () => {
                return (
                    <div>
                        <span>Lương vị trí</span>
                        <br />
                        <span>(Không gồm PC)</span>
                    </div>
                )
            },
            dataIndex: 'positionSalary',
            align: 'center',
            render: renderLVT,
            width: '8%',
            onCell: (record) => {
                if (record.positionSalary == undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: () => {
                return (
                    <div>
                        <span>Lương vị trí</span>
                        <br />
                        <span>(Có PC)</span>
                    </div>
                )
            },
            align: 'center',
            dataIndex: 'positionSalaryHaveAllowance',
            render: renderLVTPC,
            width: '8%',
            onCell: (record) => {
                if (record.positionSalaryHaveAllowance == undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: 'Tham chiếu',
            dataIndex: 'note',
            align: 'center',
            width: '8%',
            render: renderNote,
            onCell: (record) => ({
                colSpan: record.note == undefined ? 0 : '',
                onMouseEnter: () => {
                    setHoverNote(true)
                },
                onMouseLeave: () => {
                    setHoverNote(false)
                }
            })
        }
    ]

    return {
        columns
    }
}
