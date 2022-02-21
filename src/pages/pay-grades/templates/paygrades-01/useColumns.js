/* eslint-disable indent */
import {
    CloseOutlined,
    DownOutlined,
    SortAscendingOutlined,
    UpOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { Button, Input, Popconfirm, Select, Space } from 'antd'
import clsx from 'clsx'
// import Modal from 'antd/lib/modal/Modal';
import React, { useState, useCallback } from 'react'
import { calculateHeSo, formatCurrency, generateNewChild, getNgachLuongInfo, getNumChild } from 'utils/PayGradesHelper'
import ModalConfiguration from 'components/modal-configuration/ModalConfiguration'

const { Option } = Select

export const useColumns = ({
    addMode,
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
    isEditing,
    expandedKeys,
    toggleExpandedKeys,
    save,
    cancel
}) => {

    const [visible, setVisible] = useState(false)
    const [formRef, setFormRef] = useState(null)

    const handleCreate = () => {
        formRef.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Received values of form: ', values)
            formRef.resetFields()
            setVisible(false)
        })
    }

    const saveFormRef = useCallback(node => {
        if (node !== null) {
            setFormRef(node)
        }
    }, [])

    const renderNgachLuong = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        const obj = { children: text, props: {} }
        // parent row
        if (!childKey && !editable) {
            console.log(obj)
            obj.children = (
                <Space>
                    <Button
                        icon={expandedKeys.includes(record.key) ? <UpOutlined /> : <DownOutlined />}
                        type='text'
                        onClick={() => toggleExpandedKeys(record.key)}
                    />
                    <Button icon={<SortAscendingOutlined />} type='text' />
                    <Button icon={<SettingOutlined />} onClick={() => setVisible(true)} type='text' />
                    <ModalConfiguration
                        ref={saveFormRef}
                        visible={visible}
                        title={`Configuration ${obj.children}`}
                        onCancel={() => setVisible(false)}
                        onCreate={() => handleCreate()}
                    />
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

        // child row
        else if (childKey === '1') {
            obj.props.rowSpan = getNumChild(data, parentKey)
            if (!editable) {
                const [name, applyFor] = getNgachLuongInfo(data, parentKey)
                obj.children = (
                    <>
                        <div className='ngach-luong-title'>{name}</div>
                        <br />
                        <div>Áp dụng cho: {applyFor}</div>
                    </>
                )
            } else {
                obj.children = (
                    <>
                        <div>
                            <Input.TextArea
                                className='editInput'
                                autoSize={{ minRows: 2, maxRows: 6 }}
                                value={data[parentKey - 1].ngachLuong}
                                onChange={e => {
                                    setDataValue(`${parentKey}.ngachLuong`, e.target.value)
                                }}
                            />
                        </div>
                        Áp dụng cho:
                        <div>
                            <Input.TextArea
                                className='editInput'
                                autoSize={{ minRows: 2, maxRows: 6 }}
                                value={data[parentKey - 1].apDung}
                                onChange={e => {
                                    setDataValue(`${parentKey}.apDung`, e.target.value)
                                }}
                            />
                        </div>
                    </>
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
                                <div className='pop-confirm__tile'>
                                    <ExclamationCircleOutlined />
                                    Sure to delete?
                                </div>
                            }
                            icon={<></>}
                            onConfirm={() => {
                                if (isEditMode) {
                                    onClickDeleteChild(record)
                                } else {
                                    // console.log('call api delete row', record.key);
                                    onClickDeleteChild(record)
                                }
                            }}
                        >
                                <CloseOutlined className={clsx('delete-child-btn btn--danger icon--wh10px mr-5px', hoverKey === record.key ? 'visible' : 'hidden')}
                                />
                        </Popconfirm>
                        <span>
                    {record.key}</span>
                    </>
                    ): <span className='ml-15px'>{record.key}</span>}
                </div>
            )
        }

        return obj
    }

    const renderHeSo = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add')
            return {
                children: null
            }
        if (!childKey && !editable) {
            return (
                <span className='he-so'>
                    <span className='he-so__avg'>{text[0]}</span>|<span className='he-so__jump'>{text[1]}</span>
                </span>
            )
        }
        if (!childKey && editable) {
            return (
                <>
                    <span>
                        <Input
                            value={data[parentKey - 1].heSo[0]}
                            className='editInput__he-so'
                            onChange={e => {
                                setDataValue(`${parentKey}.heSo`, [e.target.value, data[parentKey - 1].heSo[1]])
                                // setDataValue(`${parentKey}.heSoTB`, val);
                            }}
                        />
                    </span>
                    <span>
                        <Input
                            value={data[parentKey - 1].heSo[1]}
                            className='editInput__he-so'
                            onChange={e => {
                                setDataValue(`${parentKey}.heSo`, [data[parentKey - 1].heSo[0], e.target.value])
                            }}
                        />
                    </span>
                </>
            )
        }
        if (childKey) {
            let cellValue = text
            // if (editable) {
            const avg = parseFloat(data[parentKey - 1].heSo[0])
            const jump = parseFloat(data[parentKey - 1].heSo[1])
            cellValue = calculateHeSo(avg, jump, parseInt(childKey) - 1, getNumChild(data, parentKey) - 1).toFixed(1)
            const currentCellValue = data[parentKey - 1].children[childKey - 1].heSo
            if (currentCellValue && cellValue.toString() !== currentCellValue.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.heSo`, cellValue])
            }
            // }

            return <div>{cellValue}</div>
        }
    }

    const renderBacLuong = (text, record) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add')
            return {
                children: null,
                props: { colSpan: 0 }
            }
        if (!childKey && !editable) {
            return text
        }
        if (!childKey && editable) {
            return (
                <Input
                    className='editInput__bac-luong'
                    value={text}
                    onChange={e => {
                        setDataValue(`${parentKey}.bacLuong`, e.target.value)
                    }}
                />
            )
        }
        if (childKey && !editable) {
            return text
        }
        if (childKey && editable) {
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

    const renderLcbPercent = (text, record) => {
        if (record.index === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editable) {
            return `${text}%`
        }
        if (childKey && editable) {
            return (
                <Input
                    className='editInput'
                    suffix='%'
                    value={text}
                    onChange={e => {
                        setDataValue(`${parentKey}.children.${childKey}.lcbPercent`, e.target.value)
                    }}
                />
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
            const lvt = parseFloat(data[parentKey - 1].children[childKey - 1].luongViTri)
            const lcbPercent = parseFloat(data[parentKey - 1].children[childKey - 1].lcbPercent) / 100
            const newVal = lvt * lcbPercent
            const oldVal = data[parentKey - 1].children[childKey - 1].lcb
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.lcb`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const renderKpiPercent = (text, record) => {
        if (record.index === 'add') return null
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (!childKey) {
            return `${text}`
        }
        if (childKey && !editable) {
            return `${text}%`
        }
        if (childKey && editable) {
            const lcbPercent = parseInt(data[parentKey - 1].children[childKey - 1].lcbPercent)
            const newVal = 100 - lcbPercent
            const oldVal = parseInt(data[parentKey - 1].children[childKey - 1].kpiPercent)
            if (newVal !== oldVal) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.kpiPercent`, newVal])
            }
            return `${newVal}%`
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
            const lvt = parseFloat(data[parentKey - 1].children[childKey - 1].luongViTri)
            const kpiPercent = parseFloat(data[parentKey - 1].children[childKey - 1].kpiPercent) / 100
            const newVal = lvt * kpiPercent
            const oldVal = data[parentKey - 1].children[childKey - 1].lkpi
            if (oldVal !== undefined && oldVal.toString() !== newVal.toString()) {
                listCellNeedUpdate.current.push([`${parentKey}.children.${childKey}.lkpi`, newVal])
            }
            return <div>{formatCurrency(newVal)}</div>
        }
    }

    const renderPhuCapUnit = (text, record, index, colPos) => {
        const editable = isEditing(record)
        const [parentKey, childKey] = record.key.split('.')
        if (record.index === 'add') return null
        if (!childKey && !editable) {
            return text
        }
        if (!childKey && editable) {
            return (
                <>
                    <Select
                        value={data[parentKey - 1][`phuCapUnit${colPos}`]}
                        size='small'
                        className='phu-cap-unit-select'
                        onChange={val => {
                            setDataValue(`${parentKey}.phuCapUnit${colPos}`, val)
                        }}
                    >
                        <Option value='%'>%</Option>
                        <Option value='VND'>VND</Option>
                    </Select>
                </>
            )
        }
        if (childKey && !editable) {
            return `${text}`
        }
        if (childKey && editable) {
            return (
                <Input
                    className='editInput'
                    value={text}
                    onChange={e => {
                        setDataValue(`${parentKey}.children.${childKey}.phuCapUnit${colPos}`, e.target.value)
                    }}
                />
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
            const lcb = parseFloat(data[parentKey - 1].children[childKey - 1].lcb)
            const phuCapUnit = parseFloat(data[parentKey - 1].children[childKey - 1][`phuCapUnit${pcPos}`]) || 0
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
            width: '12%',
            render: renderNgachLuong,
            fixed: 'left'
        },
        {
            title: '#',
            dataIndex: 'index',
            align: 'center',
            width: '6%',
            render: renderIndex,
            fixed: 'left'
        },
        {
            title: 'Bậc lương',
            dataIndex: 'bacLuong',
            align: 'center',
            width: '12%',
            editable: true,
            render: renderBacLuong,
            fixed: 'left'
        },
        {
            title: 'Hệ số',
            dataIndex: 'heSo',
            align: 'center',
            width: '8%',
            editable: true,
            render: renderHeSo,
            fixed: 'left'
        },
        {
            title: 'Lương vị trí',
            dataIndex: 'luongViTri',
            align: 'center',
            className: 'cell--border-right',
            width: '12%',
            render: renderLVT,
            fixed: 'left'
        },
        {
            title: 'Trong đó',
            dataIndex: 'lcbPercent',
            width: '6%',
            colSpan: 4,
            align: 'center',
            onHeaderCell: () => ({ className: 'cell--border-right' }),
            render: renderLcbPercent
        },
        { title: 'LCB', colSpan: 0, dataIndex: 'lcb', align: 'center', width: '12%', render: renderLcb },
        { title: '%KPI', colSpan: 0, dataIndex: 'kpiPercent', align: 'center', width: '6%', render: renderKpiPercent },
        {
            title: 'L(KPI)',
            colSpan: 0,
            dataIndex: 'lkpi',
            align: 'center',
            width: '12%',
            className: 'cell--border-right',
            render: renderLkpi
        },
        ...pcCols
            .map((col, idx) => [
                {
                    title: () => (
                        <div className='pc-title'>
                            {isEditMode ? (
                                <Input
                                    className='pc-title__input'
                                    value={col.title}
                                    onChange={e => {
                                        updatePcColTitle(idx, e.target.value)
                                    }}
                                />
                            ) : (
                                col.title
                            )}
                            {isEditMode && idx === pcCols.length - 1 && (
                                <Button
                                    icon={<PlusCircleOutlined className='btn--primary' />}
                                    type='text'
                                    shape='circle'
                                    onClick={() => {
                                        addNewPcCol()
                                    }}
                                />
                            )}
                        </div>
                    ),
                    dataIndex: `phuCapUnit${col.key}`,
                    colSpan: 2,
                    width: '6%',
                    align: 'center',
                    editable: true,
                    onHeaderCell: () => ({ className: 'cell--border-right' }),
                    render: (text, record, index) => renderPhuCapUnit(text, record, index, col.key)
                },
                {
                    title: '',
                    dataIndex: `phuCapValue${col.key}`,
                    colSpan: 0,
                    width: '8%',
                    align: 'center',
                    editable: true,
                    className: 'cell--border-right',
                    render: (text, record, index) => renderPhuCapValue(text, record, index, col.key)
                }
            ])
            .flat(),
        {
            title: 'Tổng (Gồm PC)',
            align: 'center',
            dataIndex: 'tong',
            className: 'cell--border-right',
            onHeaderCell: () => ({ className: 'cell--min-width-120' }),
            render: renderTong
        },
        {
            title: 'Ghi chú/ Tham chiếu',
            dataIndex: 'ghiChu',
            align: 'center',
            onHeaderCell: () => ({ className: 'cell--min-width-120' })
        }
    ]

    return {
        columns
    }
}
