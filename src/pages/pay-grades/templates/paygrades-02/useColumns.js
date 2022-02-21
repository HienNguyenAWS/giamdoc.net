/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from 'react'
import {
    CloseOutlined,
    DownOutlined,
    SettingOutlined,
    UpOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    CheckOutlined
} from '@ant-design/icons'
import { Button, Input, Popconfirm, Popover, Space, Modal, Select } from 'antd'
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
import ModalConfiguration from 'components/modal-configuration/ModalConfiguration'

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
    getCloneData,
    coDinhHeSo,
    setCoDinhHeSo,
    applyForData,
    setApplyForData,
    editKpi,
    setEditKpi,
    hoverNL,
    setHoverNL,
    editNL,
    setEditNL,
    editApply,
    setEditApply,
    keyEdit,
    setKeyEdit,
    addModeNL,
    setAddModeNL,
    initialSalary,
    setInitialSalary,
    setLuongKhoiDiem

}) => {

    const [visible, setVisible] = useState(false)
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

    const { Option } = Select

    useEffect(() => {
        console.log(data[0].coefficient)
    }, [data])
    const renderNgachLuong = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: text, props: {} }
        // parent row
        if (!childKey) {
            obj.children = (
                <Space>
                    { (addModeNL && parentKey == data.length) ?
                        <div className="d-flex flex-row">
                            <CloseOutlined
                                className='mr-15px'
                                style={{ color: '#FF494E80' }}
                                onClick={() => {
                                    cancel()
                                    setAddModeNL(false)
                                }}
                            ></CloseOutlined>
                            <CheckOutlined

                                style={{ color: '#97c27d' }}
                                onClick={() => {
                                    save()
                                    setAddModeNL(false)
                                }}
                            ></CheckOutlined>
                        </div>
                        :
                        <>
                            <Button
                                icon={expandedKeys.includes(record.key) ? <UpOutlined /> : <DownOutlined />}
                                type="text"
                                onClick={() => toggleExpandedKeys(record.key)}
                                disabled={(addModeNL && parentKey == data.length)}
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
                        </>
                    }
                    <Button icon={<SettingOutlined />} onClick={() => setVisible(true)} type='text' />
                    <ModalConfiguration
                        visible={visible}
                        setVisible={setVisible}
                        title={`Configuration ${obj.children}`}
                        onCancel={() => setVisible(false)}
                        recordInfo={record}
                        setData={setDataValue}
                        save={save}
                        cancel={cancel}
                        luongKhoiDiem={luongKhoiDiem}
                        setLuongKhoiDiem={setLuongKhoiDiem}
                        initialSalary={initialSalary}
                        setInitialSalary={setInitialSalary}
                    />
                </Space>
            )
        }

        // child row
        else if (childKey === '1') {
            obj.props.rowSpan = getNumChild(data, parentKey)

            if (!editNL && !editApply && !addModeNL) {
                const [name, applyFor] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <div className='d-flex flex-column height-full mt--15px'>
                        <div className="d-flex flex-row">
                            <div className="ngach-luong-title mr-5px break-word cell--overflow-text">{name}</div>
                            <Pen
                                className="icon--wh12px mt--15px mr-0 ml-auto"
                                onClick={() => {
                                    setKeyEdit(record.key)
                                    setEditNL(true)
                                }}
                            ></Pen>
                        </div>
                        <br />
                        <div className="d-flex flex-row">
                            <div className="mr-5px">
                                <div>Áp dụng cho:</div>
                                <div className='break-word cell--overflow-text'>
                                    {applyFor.map((data) => applyForData[data-1].data + '; ')}
                                </div>
                            </div>
                            <Pen
                                className="icon--wh12px mt--15px mr-0 ml-auto"
                                onClick={() => {
                                    setKeyEdit(record.key)
                                    setEditApply(true)
                                }}
                            ></Pen>
                        </div>
                    </div>
                )
            } else {
                const [name, applyFor] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <div className='d-flex flex-column height-full mt--15px'>
                        <div className="d-flex flex-row">
                            {(editNL && keyEdit == record.key) || (addModeNL && parentKey == data.length) ? (
                                <>
                                    {' '}
                                    <Input.TextArea
                                        className="editInput cell--overflow-input"
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        value={data[parentKey - 1].salaryGrade}
                                        onChange={(e) => {
                                            setDataValue(`${parentKey}.salaryGrade`, e.target.value)
                                        }}
                                    />
                                    {!addModeNL && <div className="d-flex flex-column">
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
                                    </div>}
                                </>
                            ) : (
                                <div className="ngach-luong-title break-word pr-12px cell--overflow-text">{name}</div>
                            )}
                        </div>
                        <br />
                        <div>Áp dụng cho:</div>
                        <div className="d-flex flex-row">
                            {(editApply && keyEdit == record.key) || (addModeNL && parentKey == data.length) ? (
                                <>
                                    <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn"
                                        onChange={ e => {
                                            setDataValue(`${parentKey}.applyFor`, e)
                                        }}>
                                        {applyForData.map((data) => {
                                            return <Option key={data.id} value={data.id}>{data.data}</Option>
                                        })}
                                    </Select>
                                    {!addModeNL && <div className="d-flex flex-column mr-0 ml-auto">
                                        <Button
                                            className="btn__editInstant border-0 btn--wh10px"
                                            icon={
                                                <CloseOutlined
                                                    className="icon--wh10px"
                                                    style={{ color: '#FF494E80' }}
                                                >
                                                </CloseOutlined>
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
                                    </div>}
                                </>
                            ) : (
                                <div className='pr-12px break-word cell--overflow-text'>
                                    {applyFor.map((data) => applyForData[data-1].data + '; ')}
                                </div>
                            )}
                        </div>
                    </div>
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
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (!childKey && !editHeSo && !editStep && !addModeNL) {
            return (
                <span className="he-so">
                    <span className="he-so__avg">{record.coefficient[0]}</span>
                    <Pen
                        className="icon--wh12px"
                        onClick={() => {
                            setKeyEdit(record.key)

                            setEditHeSo(true)
                        }}
                    ></Pen>
                    |<span className="he-so__jump">{record.coefficient[1]}</span>
                    <Pen
                        className="icon--wh12px"
                        onClick={() => {
                            setKeyEdit(record.key)

                            setEditStep(true)
                        }}
                    ></Pen>
                </span>
            )
        }
        if (!childKey && (editHeSo || editStep || addModeNL)) {
            return (
                <div className="child--flex-row jus-content--center align-items--center">
                    <span className="he-so">
                        {(editHeSo && record.key == keyEdit) || (addModeNL && parentKey == data.length) ? (
                            <div className="d-flex flex-row">
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
                                {!addModeNL && <div className="d-flex flex-column mr-0 ml-auto">
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
                                </div>}
                            </div>
                        ) : (
                            <span className="he-so__avg">{record.coefficient[0]}|</span>
                        )}
                    </span>

                    <span className="he-so">
                        {(editStep && record.key == keyEdit) || (addModeNL && parentKey == data.length) ? (
                            <div className="d-flex flex-row">
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
                                {!addModeNL && <div className="d-flex flex-column mr-0 ml-auto">
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
                                </div>}
                            </div>
                        ) : (
                            <span className="he-so__jump">{record.coefficient[1]}</span>
                        )}
                    </span>
                </div>
            )
        }
        if (childKey) {
            let cellValue = text
            const avg = data[parentKey - 1].coefficient[0]
            const jump = data[parentKey - 1].coefficient[1]
            if (!coDinhHeSo) {
                cellValue = calculateHeSo(avg, jump, parseInt(childKey) - 1, getNumChild(data, parentKey) - 1).toFixed(
                    1
                )
                const currentCellValue = data[parentKey - 1].children[childKey - 1].coefficient
                if (currentCellValue && cellValue.toString() !== currentCellValue.toString()) {
                    listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.coefficient`, cellValue])
                }
            } else {
                cellValue
            }

            return <div>{cellValue}</div>
        }
    }

    const [editBL, setEditBL] = useState(false)
    const renderBacLuong = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: record.salaryScale, props: {} }
        if (!childKey && !editBL && !addModeNL) {
            return (
                <>
                    <span className="mr-5px">{text}</span>
                    <Pen
                        className="icon--wh12px"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditBL(true)
                        }}
                    ></Pen>
                </>
            )
        }
        if (!childKey && (editBL || (addModeNL && parentKey == data.length))) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <Input
                        className="editInputBL"
                        maxLength={9}
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.salaryScale`, e.target.value)
                        }}
                    />
                    {!addModeNL && <div className="d-flex flex-column">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditBL(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditBL(false)
                            }}
                            size="small"
                        ></Button>
                    </div>}
                </div>
            )
        }
        if (childKey && text != 'add') {
            const newVal = `${data[parentKey - 1].salaryScale} - B${childKey}`
            const currentVal = text
            obj.props.colSpan = 2
            if (newVal !== currentVal && record.text !== 'add') {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.salaryScale`, newVal])
            }
            if (newVal !== currentVal && record.text == 'add') {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.salaryScale`, newVal])
            }
            return (
                <div className="d-flex flex-row pr-15px">
                    {<div className="" style={hoverKey === record.key ? { opacity: !hoverNL ? 1 : 0 } : { opacity: 0 }}>
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
                    </div>}
                    <div className="mr-auto ml-auto">{`${data[parentKey - 1].salaryScale} - B${childKey}`}</div>
                </div>
            )
        }

        if (childKey && text === 'add') {
            const [parentKey] = record.key.split('.')
            const siblings = data[parentKey - 1].children
            const currentLength = siblings.length
            obj.children = (
                <div style={{ textAlign: 'left' }}>
                    <Button
                        icon={<PlusCircleOutlined className='ml--20px' style={{ color: '#32A1C8' }} />}
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
        return text
    }

    const renderLVTPC = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey) {
            const percentPC1 = data[parentKey - 1].children[childKey - 1].allowancePercent1 === null
                ? parseFloat(data[parentKey - 1].allowanceDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const percentPC2 = data[parentKey - 1].children[childKey - 1].allowancePercent2 === null
                ? parseFloat(data[parentKey - 1].allowanceDefault2 / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const kpiPercent = data[parentKey - 1].children[childKey - 1].kpiPercent === null
                ? parseFloat(data[parentKey - 1].kpiDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const pc1 = coefficient * luongKhoiDiem * kpiPercent * percentPC1
            const pc2 = coefficient * luongKhoiDiem * kpiPercent * percentPC2
            const text = coefficient * luongKhoiDiem + pc1 + pc2
            return formatCurrency(text)
        }
        return text
    }

    const renderLkpi = (text, record) => {
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
        if (childKey) {
            const percent = data[parentKey - 1].children[childKey - 1].kpiPercent === null
                ? parseFloat(data[parentKey - 1].kpiDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const text = coefficient * luongKhoiDiem * percent
            return formatCurrency(text)
        }
        return text
    }

    const renderLCB = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.salaryScale === 'add')
            return {
                children: null
            }
        if (childKey) {
            const percent = data[parentKey - 1].children[childKey - 1].kpiPercent === null
                ? parseFloat(data[parentKey - 1].kpiDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const text = coefficient * luongKhoiDiem - coefficient * luongKhoiDiem * percent
            return formatCurrency(text)
        }
        return text
    }

    const renderPC1 = (text, record) => {
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
        if (childKey) {
            const percent = data[parentKey - 1].children[childKey - 1].allowancePercent1 === null
                ? parseFloat(data[parentKey - 1].allowanceDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent1 / 100)
            const kpiPercent = data[parentKey - 1].children[childKey - 1].kpiPercent === null
                ? parseFloat(data[parentKey - 1].kpiDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const renderVal = coefficient * luongKhoiDiem * percent * kpiPercent
            return formatCurrency(renderVal)
        }
        return text
    }

    const renderPC2 = (text, record) => {
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
        if (childKey) {
            const percent = data[parentKey - 1].children[childKey - 1].allowancePercent2 === null
                ? parseFloat(data[parentKey - 1].allowanceDefault2 / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].allowancePercent2 / 100)
            const kpiPercent = data[parentKey - 1].children[childKey - 1].kpiPercent === null
                ? parseFloat(data[parentKey - 1].kpiDefault / 100)
                : parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent / 100)
            const coefficient = parseFloat(data[parentKey - 1].children[childKey - 1].coefficient)
            const renderVal = coefficient * luongKhoiDiem * percent * kpiPercent
            return formatCurrency(renderVal)
        }
        return text
    }

    const [hoverKpi, setHoverKpi] = useState(false)
    const renderKpiPercent = (text, record) => {
        if (record.salaryScale === 'add') return null
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span>{text}</span>
        }
        if (childKey && !editKpi) {
            return (
                <div className="ml-17px">
                    <span>{text === null ? data[parentKey-1].kpiDefault : text}</span>
                    <Pen
                        className="icon--wh12px m-0 ml-5px"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditKpi(true)
                        }}
                        style={hoverKey == record.key && hoverKpi ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && editKpi && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-center ml-15px"
                        type="text"
                        value={text === null ? data[parentKey-1].kpiDefault : text}
                        maxLength={3}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.kpiPercent`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }} onClick={() => {
                            cancel()
                            setEditKpi(false)
                        }}></CloseOutlined>

                        <CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }} onClick={() => {
                            save()
                            setEditKpi(false)
                        }}></CheckOutlined>
                    </div>
                </div>
            )
        }
        if (childKey && editKpi) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="ml-15px">{text === null ? data[parentKey-1].kpiDefault : text}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0 ml-5px">
                        <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                        <CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>
                    </div>
                </div>
            )
        }
    }

    const [hoverPC1, setHoverPC1] = useState(false)
    const [editPC1, setEditPC1] = useState(false)
    const renderAllowancePercent1 = (text, record) => {
        if (record.salaryScale === 'add') return null
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span>{text}</span>
        }
        if (childKey && !editPC1) {
            return (
                <div className='height-full'>
                    <span className="ml-15px">{text === null ? data[parentKey-1].allowanceDefault : text}</span>
                    <Pen
                        className="icon--wh12px m-0 ml-5px"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditPC1(true)
                        }}
                        style={hoverKey == record.key && hoverPC1 ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && editPC1 && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-center pl-12px"
                        type="text"
                        value={text === null ? data[parentKey-1].allowanceDefault : text}
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
                <div className="d-flex flex-row jus-content--center height-full">
                    <span className="ml-8px">{text === null ? data[parentKey-1].allowanceDefault : text}</span>
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
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span>{text}</span>
        }
        if (childKey && !editPC2) {
            return (
                <div className="height-full">
                    <span className="ml-15px">{text === null ? data[parentKey-1].allowanceDefault2 : text}</span>
                    <Pen
                        className="icon--wh12px m-0 ml-5px"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditPC2(true)
                        }}
                        style={hoverKey == record.key && hoverPC2 ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && editPC2 && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-center pl-12px"
                        type="text"
                        value={text === null ? data[parentKey-1].allowanceDefault2 : text}
                        maxlength={3}
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
                <div className="d-flex flex-row jus-content--center height-full">
                    <span className="ml-8px">{text === null ? data[parentKey-1].allowanceDefault2 : text}</span>
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
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editNote) {
            return (
                <div className="txt-right height-full">
                    <span>{text}</span>
                    <Pen
                        className="icon--wh12px m-0 ml-5px"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditNote(true)
                        }}
                        style={hoverKey == record.key && hoverNote ? { opacity: '1' } : { opacity: '0' }}

                    ></Pen>
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
            render: renderNgachLuong,
            fixed: 'left',
            onCell: () => ({
                className: 'text--top width-max-150px width-min-150px',
                onMouseEnter: () => {
                    setHoverNL(true)
                },
                onMouseLeave: () => {
                    setHoverNL(false)
                }
            })
        },
        {
            title: 'Bậc lương',
            dataIndex: 'salaryScale',
            align: 'center',
            render: renderBacLuong,
            className: 'width-min-150px width-max-150px',
            fixed: 'left'
        },
        {
            title: 'Hệ số',
            dataIndex: 'coefficient',
            align: 'center',
            render: renderHeSo,
            onCell: (record) => ({
                colSpan: record.basicSalary === undefined ? 0 : '',
                className: ' cell--height-24px width-min-110px'
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
            onCell: (record) => ({
                colSpan: record.basicSalary === undefined ? 0 : ''
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
            className: 'width-min-100px width-max-100px height-min-26px height-max-26px height--26px',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            render: renderKpiPercent,
            onCell: (record) => ({
                colSpan: record.kpiPercent === undefined ? 0 : '',
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
            className: 'cell--border-right width-min-120px pl-0',
            render: renderLkpi,
            onCell: (record) => {
                if (record.kpiSalary === undefined) {
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
            className: 'width-min-80px width-max-80px height-min-26px height-max-26px height--26px',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            render: renderAllowancePercent1,
            onCell: (record) => ({
                colSpan: record.allowancePercent1 === undefined ? 0 : '',
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
            className: 'cell--border-right width-min-90px pl-0',
            render: renderPC1,
            onCell: (record) => {
                if (record.allowance === undefined) {
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
            className: 'width-min-80px width-max-80px height-min-26px height-max-26px height--26px',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            render: renderAllowancePercent2,
            onCell: (record) => ({
                colSpan: record.allowancePercent2 === undefined ? 0 : '',
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
            className: 'cell--border-right width-min-90px pl-0',
            render: renderPC2,
            onCell: (record) => {
                if (record.allowance2 === undefined) {
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
            className: 'width-min-130px',
            onCell: (record) => {
                if (record.positionSalary === undefined) {
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
            className: 'width-min-110px',
            onCell: (record) => {
                if (record.positionSalaryHaveAllowance === undefined) {
                    return { colSpan: 0 }
                }
            }
        },
        {
            title: 'Tham chiếu',
            dataIndex: 'note',
            align: 'center',
            className: 'width-min-110px width-max-110px',
            render: renderNote,
            onCell: (record) => ({
                colSpan: record.note === undefined ? 0 : '',
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
