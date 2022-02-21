/* eslint-disable indent */
import {
    CloseOutlined,
    DownOutlined,
    UpOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    SettingOutlined,
    CheckOutlined
} from '@ant-design/icons'
import { Button, Input, Popconfirm, Select, Space } from 'antd'
import clsx from 'clsx'
// import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react'
import { calculateHeSo, formatCurrency, generateNewChild, getNgachLuongInfo, getNumChild } from 'utils/PayGradesHelper'
import ModalConfiguration1 from 'components/modal-configuration/ModalConfiguration1'
import Pen from 'pages/pay-grades/components/Pen'
import ArrowUp from 'pages/pay-grades/components/ArrowUp'
import ArrowDown from 'pages/pay-grades/components/ArrowDown'

const { Option } = Select

export const useColumns = ({
    updatePcColTitle,
    addNewPcCol,
    pcCols,
    onClickDeleteChild,
    isEditMode,
    hoverKey,
    listCellNeedUpdate,
    setDataValue,
    luongKhoiDiem,
    data,
    expandedKeys,
    toggleExpandedKeys,
    save,
    cancel,
    toDown,
    toUp,
    applyForData,
    initialSalary,
    setInitialSalary,
    setLuongKhoiDiem
}) => {
    const [visible, setVisible] = useState(false)

    const [configKey, setConfigKey] = useState(null)

    const [keyEdit, setKeyEdit] = useState(0)
    const [hoverNL, setHoverNL] = useState(false)
    const [editNL, setEditNL] = useState(false)
    const [editApply, setEditApply] = useState(false)

    const renderNgachLuong = (text, record) => {
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
                    <Button icon={<SettingOutlined />}
                        onClick={() => {
                            setVisible(true)
                            setConfigKey(parentKey)
                        }}
                        type="text" />
                        {record.key == configKey &&
                        <ModalConfiguration1
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
                        }
                </Space>
            )
        }
        // child row
        else if (childKey === '1') {
            obj.props.rowSpan = getNumChild(data, parentKey)
            if (!editNL && !editApply) {
                const [name, apDung] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <div className="d-flex flex-column height-full mt--15px">
                        <div className="d-flex flex-row">
                            <div className="ngach-luong-title mr-5px">{name}</div>
                            <Pen
                                className="icon--wh12px mt--15px"
                                onClick={() => {
                                    setKeyEdit(record.key)
                                    setEditNL(true)
                                }}
                            ></Pen>
                        </div>
                        <br />
                        <div className="d-flex flex-row">
                            Áp dụng cho: {apDung.map((data) => applyForData[data - 1].data + '; ')}
                            <Pen
                                className="icon--wh12px mt--15px"
                                onClick={() => {
                                    setKeyEdit(record.key)
                                    setEditApply(true)
                                }}
                            ></Pen>
                        </div>
                    </div>
                )
            } else {
                const [name, apDung] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <div className="d-flex flex-column height-full mt--15px">
                        <div className="d-flex flex-row">
                            {editNL && keyEdit == record.key ? (
                                <>
                                    {' '}
                                    <Input.TextArea
                                        className="editInput"
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        value={data[parentKey - 1].ngachLuong}
                                        onChange={(e) => {
                                            setDataValue(`${parentKey}.ngachLuong`, e.target.value)
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
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Chọn"
                                        onChange={(e) => {
                                            setDataValue(`${parentKey}.apDung`, e)
                                        }}
                                    >
                                        {applyForData.map((data) => {
                                            return (
                                                <Option key={data.id} value={data.id}>
                                                    {data.data}
                                                </Option>
                                            )
                                        })}
                                    </Select>
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
                                apDung.map((data) => applyForData[data - 1].data + '; ')
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

    const renderIndex = (text, record) => {
        const isChild = record.key.includes('.')

        const [childKey] = record.key.split('.')
        const obj = { children: record.key, props: {} }
        if (text === 'add') {
            const [parentKey] = record.key.split('.')
            obj.props.colSpan = 2
            const siblings = data[parentKey - 1].children
            const currentLength = siblings.length

            obj.children = (
                <div className="add-child-row">
                    <Button
                        icon={<PlusCircleOutlined className="btn--primary" />}
                        type="text"
                        onClick={() => {
                            setDataValue(`${parentKey}.children.${currentLength}`, generateNewChild(siblings))
                            setDataValue(`${parentKey}.children.${currentLength + 1}`, {
                                key: `${parentKey}.${currentLength + 1}`,
                                index: 'add'
                            })
                            // if (currentLength > 8 && (currentLength - 8) % 2 === 1)
                            if (currentLength % 2 === 1) {
                                const avg = parseFloat(data[parentKey - 1].heSo[0])
                                const jump = parseFloat(data[parentKey - 1].heSo[1])

                                setDataValue(`${parentKey}.heSo`, [avg + jump, jump])
                            }
                        }}
                    >
                        Thêm bậc lương
                    </Button>
                </div>
            )
        } else {
            obj.children = (
                <div className={clsx({ 'index-child-row ml': !!childKey })}>
                    {isChild ? (
                        // (!isEditMode ||
                        // 	(isEditMode &&
                        // 		data[parentKey - 1].children.length > 8 &&
                        // 		parseInt(childKey) === data[parentKey - 1].children.length - 1)) && (
                        <>
                            <Popconfirm
                                cancelButtonProps={{ className: 'pop-confirm__btn' }}
                                okButtonProps={{ className: 'pop-confirm__btn' }}
                                title={
                                    <div className="pop-confirm__tile">
                                        <ExclamationCircleOutlined />
                                        Sure to delete?
                                    </div>
                                }
                                icon={<></>}
                                onConfirm={() => {
                                    if (isEditMode) {
                                        onClickDeleteChild(record)
                                    } else {
                                        onClickDeleteChild(record)
                                    }
                                }}
                            >
                                <CloseOutlined
                                    className={clsx(
                                        'delete-child-btn btn--danger icon--wh10px mr-5px',
                                        hoverKey === record.key ? (!hoverNL ? 'visible' : 'hidden') : 'hidden'
                                    )}
                                />
                            </Popconfirm>
                            <span>{record.key}</span>
                        </>
                    ) : (
                        <span className="ml-15px">{record.key}</span>
                    )}
                </div>
            )
        }

        return obj
    }

    const [editHeSo, setEditHeSo] = useState(false)
    const [editStep, setEditStep] = useState(false)
    const renderHeSo = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add')
            return {
                children: null
            }
        if (!childKey && !editHeSo && !editStep) {
            return (
                <span className="he-so">
                    <span className="he-so__avg">{record.heSo[0]}</span>
                    <Pen
                        className="icon--wh12px"
                        onClick={() => {
                            setKeyEdit(record.key)

                            setEditHeSo(true)
                        }}
                    ></Pen>
                    |<span className="he-so__jump">{record.heSo[1]}</span>
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

        if (!childKey && (editHeSo || editStep)) {
            return (
                <div className="d-flex flex-row jus-content--center align-items--center">
                    <span className="he-so">
                        {(editHeSo && record.key == keyEdit) ? (
                            <div className="d-flex flex-row">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={data[parentKey - 1].heSo[0]}
                                    className="editInput__he-so input--hideArrow"
                                    onChange={(e) => {
                                        setDataValue(`${parentKey}.heSo`, [
                                            e.target.value,
                                            data[parentKey - 1].heSo[1]
                                        ])
                                        setDataValue(`${parentKey}.heSoTB`, e.target.value)
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
                            </div>
                        ) : (
                            <span className="he-so__avg">{record.heSo[0]}|</span>
                        )}
                    </span>

                    <span className="he-so">
                        {(editStep && record.key == keyEdit) ? (
                            <div className="d-flex flex-row">
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={data[parentKey - 1].heSo[1]}
                                    className="editInput__he-so input--hideArrow"
                                    onChange={(e) => {
                                        setDataValue(`${parentKey}.heSo`, [
                                            data[parentKey - 1].heSo[0],
                                            e.target.value
                                        ])
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
                            </div>
                        ) : (
                            <span className="he-so__jump">{record.heSo[1]}</span>
                        )}
                    </span>
                </div>
            )
        }

        if (childKey) {
            let cellValue = text
            // if (editable) {
            const avg = parseFloat(data[parentKey - 1].heSo[0])
            const jump = parseFloat(data[parentKey - 1].heSo[1])
            // eslint-disable-next-line no-debugger
            cellValue = calculateHeSo(
                avg,
                jump,
                parseInt(childKey) - 1,
                getNumChild(data, parentKey) - 1,
                data[parentKey - 1].loaiHeSo
            ).toFixed(1)
            const currentCellValue = data[parentKey - 1].children[childKey - 1].heSo
            if (currentCellValue && cellValue.toString() !== currentCellValue.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.heSo`, cellValue])
            }
            // }

            return <div>{cellValue}</div>
        }
    }

    const [editBL, setEditBL] = useState(false)
    const renderBacLuong = (text, record) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add')
            return {
                children: null,
                props: { colSpan: 0 }
            }
        if (!childKey && !editBL) {
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
        if (!childKey && editBL) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <Input
                        className="editInputBL"
                        maxLength={9}
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.bacLuong`, e.target.value)
                        }}
                    />
                    <div className="d-flex flex-column">
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
                    </div>
                </div>
            )
        }
        if (childKey && !editBL) {
            return text
        }
        if (childKey && editBL) {
            const newVal = `${data[parentKey - 1].bacLuong} - B${childKey}`
            const currentVal = text
            if (newVal !== currentVal && record.text !== 'add') {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.bacLuong`, newVal])
            }
            return <div>{`${data[parentKey - 1].bacLuong} - B${childKey}`}</div>
        }
    }

    const renderLVT = (text, record) => {
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        // if (childKey && !editable) {
        //     return formatCurrency(text);
        // }
        // if (childKey && editable) {
        if (childKey) {
            const heSo = parseFloat(data[parentKey - 1].children[childKey - 1].heSo)
            const newVal = heSo * luongKhoiDiem
            const oldVal = data[parentKey - 1].children[childKey - 1].luongViTri
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.luongViTri`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
        return text
    }

    const [editLcbPercent, setEditLcbPercent] = useState(false)
    const [hoverLcb, setHoverLcb] = useState(false)
    const renderLcbPercent = (text, record) => {
        if (record.index === 'add') return null
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editLcbPercent) {
            return (
                text !== undefined &&
                <div className="ml-17px">
                    <span>{(text === null) ? data[parentKey-1].lcbDefault+'%' : text+'%'}</span>
                    <Pen
                        className="icon--wh12px m-0"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditLcbPercent(true)
                        }}
                        style={hoverKey == record.key && hoverLcb ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && editLcbPercent && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-center pl-12px"
                        type="number"
                        step={0.5}
                        value={text}
                        maxLength={3}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.lcbPercent`, e.target.value)
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
                                setEditLcbPercent(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditLcbPercent(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editLcbPercent) {
            return (
                text !== undefined &&
                <div className="d-flex flex-row jus-content--center">
                    <span className="ml-15px">{text === null ? data[parentKey-1].lcbDefault+'%' : text='%'}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0 ml-5px">
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

    const renderLcb = (text, record) => {
        if (record.index === 'add') return null
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        // if (childKey && !editable) {
        //     return `${formatCurrency(text)}`;
        // }
        // if (childKey && editable) {
        if (childKey) {
            const percent = (data[parentKey - 1].children[childKey - 1].lcbPercent === null) ? data[parentKey-1].lcbDefault : data[parentKey - 1].children[childKey - 1].lcbPercent
            const lvt = parseFloat(data[parentKey - 1].children[childKey - 1].luongViTri)
            const lcbPercent = parseFloat(percent) / 100
            const newVal = lvt * lcbPercent
            const oldVal = data[parentKey - 1].children[childKey - 1].lcb
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.lcb`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const [editKpi, setEditKpi] = useState(false)
    const [hoverKpi, setHoverKpi] = useState(false)
    const renderKpiPercent = (text, record) => {
        if (record.salaryScale === 'add') return null
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return <span>{text}</span>
        }
        if (childKey && !editKpi) {
            return (
                text !== undefined &&

                <div className="ml-17px">
                    <span>{(text === null) ? data[parentKey-1].kpiDefault+'%' : text+'%'}</span>
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
                text !== undefined &&
                <div className="d-flex flex-row jus-content--center">
                    <span className="ml-15px">{(text === null) ? data[parentKey-1].kpiDefault+'%' : (text+'%')}</span>
                    <div className="d-flex flex-column mr-0 ml-auto visible--hidden m-0 ml-5px">
                        <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                        <CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>
                    </div>
                </div>
            )
        }
    }

    const renderLkpi = (text, record) => {
        if (record.index === 'add') return null
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        // if (childKey && !editable) {
        //     return `${formatCurrency(text)}`;
        // }
        // if (childKey && editable) {
        if (childKey) {
            const percent = (data[parentKey - 1].children[childKey - 1].kpiPercent === null) ? data[parentKey-1].kpiDefault : data[parentKey - 1].children[childKey - 1].kpiPercent
            const lvt = parseFloat(data[parentKey - 1].children[childKey - 1].luongViTri)
            const kpiPercent = parseFloat(percent) / 100
            const newVal = lvt * kpiPercent
            const oldVal = data[parentKey - 1].children[childKey - 1].lkpi
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.lkpi`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const [hoverPC, setHoverPC] = useState(false)
    const [hoverUnitPC, setHoverUnitPC] = useState(false)
    const [editPC, setEditPC] = useState(false)
    const [editUnitPC, setEditUnitPC] = useState(false)
    const renderPhuCapUnit = (text, record, index, colPos) => {
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add') return null

        if (!childKey && !editUnitPC) {
            return (
                <div className="ml-17px">
                    <span className="mr-5px">{text}</span>
                    <Pen
                        className="icon--wh12px m-0"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditUnitPC(true)
                        }}
                        style={hoverKey == record.key && hoverUnitPC ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (!childKey && editUnitPC && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Select
                        value={data[parentKey - 1][`phuCapUnit${colPos}`]}
                        size="small"
                        className="phu-cap-unit-select"
                        onChange={(val) => {
                            setDataValue(`${parentKey}.phuCapUnit${colPos}`, val)
                        }}
                    >
                        <Option value="%">%</Option>
                        <Option value="VND">VND</Option>
                    </Select>
                    <div className="d-flex flex-column mr-0 ml-auto">
                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={
                                <CloseOutlined className="icon--wh10px" style={{ color: '#FF494E80' }}></CloseOutlined>
                            }
                            onClick={() => {
                                cancel()
                                setEditUnitPC(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditUnitPC(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (!childKey && editUnitPC && keyEdit != record.key) {
            return (
                <div className="ml-17px">
                    <span className="mr-5px">{text}</span>
                    <Pen
                        className="icon--wh12px m-0"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditUnitPC(true)
                        }}
                        style={hoverKey == record.key && hoverUnitPC ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && !editPC) {
            return (
                <div className="ml-17px">
                    <span className="mr-5px">{text == null ?
                    data[parentKey -1].phuCapDefault
                    : text}</span>
                    <Pen
                        className="icon--wh12px m-0"
                        onClick={() => {
                            setKeyEdit(record.key)
                            setEditPC(true)
                        }}
                        style={hoverKey == record.key && hoverPC ? { opacity: '1' } : { opacity: '0' }}
                    ></Pen>
                </div>
            )
        }
        if (childKey && editPC && keyEdit == record.key) {
            return (
                <div className="d-flex flex-row">
                    <Input
                        className="editInput input__percentEdit input--hideArrow txt-center ml-15px"
                        type="number"
                        step={0.5}
                        value={text}
                        onChange={(e) => {
                            setDataValue(`${parentKey}.children.${childKey}.phuCapUnit1`, e.target.value)
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
                                setEditPC(false)
                            }}
                            size="small"
                        ></Button>

                        <Button
                            className="btn__editInstant border-0 btn--wh10px"
                            icon={<CheckOutlined className="icon--wh10px" style={{ color: '#97c27d' }}></CheckOutlined>}
                            onClick={() => {
                                save()
                                setEditPC(false)
                            }}
                            size="small"
                        ></Button>
                    </div>
                </div>
            )
        }
        if (childKey && editPC) {
            return (
                <div className="d-flex flex-row jus-content--center">
                    <span className="ml-15px">{text == null ? data[parentKey - 1].phuCapDefault : text}</span>
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

    const renderPhuCapValue = (text, record, index, pcPos) => {
        if (record.index === 'add') return null
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text || 0
        }
        // if (childKey && !editable) {
        //     return `${formatCurrency(text)}`;
        // }
        // if (childKey && editable) {
        if (childKey) {
            const percent = data[parentKey - 1].children[childKey - 1][`phuCapUnit${pcPos}`] == null ? data[parentKey - 1].phuCapDefault : data[parentKey - 1].children[childKey - 1][`phuCapUnit${pcPos}`]
            const lcb = parseFloat(data[parentKey - 1].children[childKey - 1].lcb)
            const phuCapUnit = parseFloat(percent) || 0
            const parentPhuCapUnit = data[parentKey - 1][`phuCapUnit${pcPos}`]
            let newVal
            if (parentPhuCapUnit === '%') {
                newVal = (lcb * phuCapUnit) / 100
            } else if (parentPhuCapUnit === 'VND') {
                newVal = phuCapUnit
            }
            const oldVal = data[parentKey - 1].children[childKey - 1][`phuCapValue${pcPos}`] || 0

            if (oldVal !== undefined && newVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.phuCapValue${pcPos}`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const renderTong = (text, record) => {
        if (record.index === 'add') return null
        // const editable = isEditing(record);
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return text
        }
        // if (childKey && !editable) {
        //     return `${formatCurrency(text)}`;
        // }
        // if (childKey && editable) {
        if (childKey) {
            const lvt = parseFloat(data[parentKey - 1].children[childKey - 1].luongViTri)
            let sumPhuCapValue = 0
            pcCols.forEach((_, idx) => {
                sumPhuCapValue += parseFloat(data[parentKey - 1].children[childKey - 1][`phuCapValue${idx + 1}`] || 0)
            })
            const newVal = lvt + sumPhuCapValue
            const oldVal = data[parentKey - 1].children[childKey - 1].tong || 0
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.tong`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const columns = [
        {
            title: 'Ngạch lương',
            dataIndex: 'ngachLuong',
            editable: true,
            render: renderNgachLuong,
            fixed: 'left',
            className: 'text--top width-max-150px width-min-150px',
            onCell: () => ({
                className: 'text--top',
                onMouseEnter: () => {
                    setHoverNL(true)
                },
                onMouseLeave: () => {
                    setHoverNL(false)
                }
            })
        },
        {
            title: '#',
            dataIndex: 'index',
            align: 'center',
            render: renderIndex,
            className: 'width-min-80px width-max-80px',
            fixed: 'left'
        },
        {
            title: 'Bậc lương',
            dataIndex: 'bacLuong',
            align: 'center',
            editable: true,
            className: 'width-min-150px width-max-150px',
            render: renderBacLuong,
            fixed: 'left'
        },
        {
            title: 'Hệ số',
            dataIndex: 'heSo',
            align: 'center',
            editable: true,
            className: ' cell--height-24px width-min-110px',
            render: renderHeSo,
            fixed: 'left'
        },
        {
            title: 'Lương vị trí',
            dataIndex: 'luongViTri',
            align: 'center',
            className: 'cell--border-right width-min-120px',
            render: renderLVT,
            fixed: 'left'
        },
        {
            title: 'Trong đó',
            dataIndex: 'lcbPercent',
            colSpan: 4,
            align: 'center',
            className: 'width-min-100px width-max-100px height-min-26px height-max-26px height--26px',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            render: renderLcbPercent,
            onCell: () => ({
                onMouseEnter: () => {
                    setHoverLcb(true)
                },
                onMouseLeave: () => {
                    setHoverLcb(false)
                }
            })
        },
        {
            title: 'LCB',
            colSpan: 0,
            dataIndex: 'lcb',
            align: 'center',
            className: 'width-min-120px pl-0',
            render: renderLcb
        },
        {
            title: '%KPI',
            colSpan: 0,
            dataIndex: 'kpiPercent',
            align: 'center',
            className: 'width-min-100px width-max-100px height-min-26px height-max-26px height--26px',
            render: renderKpiPercent,
            onCell: () => ({
                onMouseEnter: () => {
                    setHoverKpi(true)
                },
                onMouseLeave: () => {
                    setHoverKpi(false)
                }
            })
        },
        {
            title: 'L(KPI)',
            colSpan: 0,
            dataIndex: 'lkpi',
            align: 'center',
            className: 'cell--border-right width-min-120px pl-0',
            render: renderLkpi
        },
        ...pcCols
            .map((col, idx) => [
                {
                    title: () => (
                        <div className="pc-title">
                            {isEditMode ? (
                                <Input
                                    className="pc-title__input"
                                    value={col.title}
                                    onChange={(e) => {
                                        updatePcColTitle(idx, e.target.value)
                                    }}
                                />
                            ) : (
                                col.title
                            )}
                            {isEditMode && idx === pcCols.length - 1 && (
                                <Button
                                    icon={<PlusCircleOutlined className="btn--primary" />}
                                    type="text"
                                    shape="circle"
                                    onClick={() => {
                                        addNewPcCol()
                                    }}
                                />
                            )}
                        </div>
                    ),
                    dataIndex: `phuCapUnit${col.key}`,
                    colSpan: 2,
                    align: 'center',
                    editable: true,
                    className: 'cell--border-right width-min-110px width-max-110px height-min-26px height-max-26px height--26px',
                    onHeaderCell: () => ({
                        className: 'cell--border-right'
                    }),
                    onCell: (record) => ({
                        onMouseEnter: () => {
                            record.key.split('.')[1] ? setHoverPC(true) : setHoverUnitPC(true)
                        },
                        onMouseLeave: () => {
                            record.key.split('.')[1] ? setHoverPC(false) : setHoverUnitPC(false)
                        }
                    }),
                    render: (text, record, index) => renderPhuCapUnit(text, record, index, col.key)
                },
                {
                    title: '',
                    dataIndex: `phuCapValue${col.key}`,
                    colSpan: 0,
                    align: 'center',
                    editable: true,
                    className: 'cell--border-right width-min-100px',
                    render: (text, record, index) => renderPhuCapValue(text, record, index, col.key)
                }
            ])
            .flat(),
        {
            title: 'Tổng (Gồm PC)',
            align: 'center',
            dataIndex: 'tong',
            className: 'cell--border-right width-min-110px',
            onHeaderCell: () => ({ className: 'cell--min-width-120' }),
            render: renderTong
        },
        {
            title: 'Ghi chú/ Tham chiếu',
            dataIndex: 'ghiChu',
            align: 'center',
            className: 'width-min-110px width-max-110px',
            onHeaderCell: () => ({
                className: 'cell--min-width-120'
            })
        }
    ]

    return {
        columns
    }
}
