import { Button, Select, Table } from 'antd'
import { data as _initialData, pcCols as _pcCols } from 'pages/pay-grades/initialize-data/_mock01'
import { filterData, initialSalary as _initialSalary, applyForData as _applyForData } from 'pages/pay-grades/initialize-data/_masterData'
import 'pages/pay-grades/PayGrades.scss'
import React, { useEffect, useRef, useState } from 'react'
import { generateNewChild, generateNewNL } from 'utils/PayGradesHelper'
import { useColumns } from './useColumns'
import { Data } from '@react-google-maps/api'

const { Option } = Select

const getCloneData = data =>
    data.map((r, parentIdx) => ({
        ...r,
        key: `${parentIdx + 1}`,
        children: r.children.map((e, childIdx) => ({ ...e, key: `${parentIdx + 1}.${childIdx + 1}` }))
    }))

const getCloneCols = cols => cols.map(e => ({ ...e }))
const transformData = d => {
    d.forEach(r => {
        r.children.push({ key: `${r.key}.${r.children.length + 1}`, index: 'add' })
    })
    return d
}
const initialData = transformData(_initialData)

const PayGrades01 = () => {
    const [expandedKeys, setExpandedKeys] = useState(initialData.map(e => e.key))
    const [editingKey, setEditingKey] = useState('')
    const [data, setData] = useState(initialData)
    const [initialSalary, setInitialSalary] = useState(_initialSalary)
    const [luongKhoiDiem, setLuongKhoiDiem] = useState(initialSalary[0].value)
    const [pcCols, setPcCols] = useState(_pcCols)
    const countPcCols = useRef(1)
    const initialDataRef = useRef(getCloneData(initialData))
    const initialPcColRef = useRef(getCloneCols(_pcCols))
    const [hoverKey, setHoverKey] = useState(null)
    const listCellNeedUpdate = useRef([])
    const [addMode, setAddMode] = useState(false)
    const [filterSection, setFilterSection] = useState(filterData)
    const [applyForData, setApplyForData] = useState(_applyForData)

    const setDataValue = (path, value) => {
        const [parentKey, parentDataIdx, childKey, childDataIdx] = path.split('.')
        const parentIdx = parseInt(parentKey) - 1
        const childIdx = parseInt(childKey) - 1
        const newData = [...data]
        if (parentDataIdx === 'children') {
            if (childDataIdx) {
                newData[parentIdx].children[childIdx][childDataIdx] = value
            } else if (childKey) {
                newData[parentIdx].children[childIdx] = value
            } else {
                newData[parentIdx].children = value
            }
        } else {
            newData[parentIdx][parentDataIdx] = value
        }
        setData(newData)
    }

    const isEditing = record => !!(record.key === editingKey || record.key.startsWith(`${editingKey}.`))
    const isEditMode = !!editingKey
    const isHeSoAvgRow = record => {
        const [parentKey, childKey] = record.key.split('.')
        return !!childKey && parseFloat(record.heSo) === parseFloat(data[parentKey - 1].heSo[0])
    }
    const edit = record => {
        setEditingKey(record.key)
        if (!expandedKeys.includes(record.key)) toggleExpandedKeys(record.key)
    }

    const cancel = () => {
        setEditingKey('')
        setData(getCloneData(initialDataRef.current.slice()))
        setPcCols(initialPcColRef.current.slice())
        setAddMode(false)
    }

    const toggleExpandedKeys = key => {
        setExpandedKeys(prev => {
            const outArr = [...prev]
            if (outArr.includes(key)) {
                return outArr.filter(e => e !== key)
            } else {
                outArr.push(key)
                return outArr
            }
        })
    }

    const toUp = (record) => {
        const newData = data;
        [newData[record-1], newData[record-2]] = [newData[record-2], newData[record-1]]
        setData(getCloneData(newData))
        initialDataRef.current = getCloneData(newData)
    }

    const toDown = (record) => {
        const newData = data;
        [newData[record-1], newData[record]] = [newData[record], newData[record-1]]
        setData(getCloneData(newData))
        initialDataRef.current = getCloneData(newData)
    }

    const save = async () => {
        try {
            // call api

            // for demo
            initialDataRef.current = getCloneData(data)
            initialPcColRef.current = getCloneCols(pcCols)
            setEditingKey('')
            setAddMode(false)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    }

    const onClickAddNewNL = () => {
        const newNL = generateNewNL(data, pcCols)
        edit(newNL)
        setData(getCloneData([...data, newNL]))
        setAddMode(true)
        setFilterSection([...filterSection, {
            value: newNL.key,
            label: newNL.ngachLuong
        }])
    }

    const onClickAddChild = parentKey => {
        const siblings = data[parentKey - 1].children
        const currentLength = siblings.length
        setDataValue(`${parentKey}.children.${currentLength}`, generateNewChild(siblings))
        setDataValue(`${parentKey}.children.${currentLength + 1}`, {
            key: `${parentKey}.${currentLength + 1}`,
            index: 'add'
        })
        if (currentLength % 2 === 1) {
            const avg = parseFloat(data[parentKey - 1].heSo[0])
            const jump = parseFloat(data[parentKey - 1].heSo[1])
            setDataValue(`${parentKey}.heSo`, [parseFloat(avg + jump).toFixed(1), jump])
        }
    }

    const onClickDeleteChild = record => {
        const [parentKey] = record.key.split('.')
        const siblingsLength = data[parentKey - 1].children.length
        let newChildren = data[parentKey - 1].children.filter(c => c.key !== record.key)
        newChildren = newChildren.map((c, idx) => {
            return { ...c, key: `${parentKey}.${idx + 1}` }
        })
        setDataValue(`${parentKey}.children`, newChildren)
        if ((siblingsLength - 8) % 2 === 0) {
            const avg = parseFloat(data[parentKey - 1].heSo[0])
            const jump = parseFloat(data[parentKey - 1].heSo[1])
            setDataValue(`${parentKey}.heSo`, [avg - jump, jump])
        }
    }

    const deleteSection = record => {
        const newData = data.filter(e => e.key !== record.key)
        setData(getCloneData(newData))
        initialDataRef.current = getCloneData(newData)
    }

    const addNewPcCol = () => {
        const nextKey = ++countPcCols.current
        setPcCols([...pcCols, { key: nextKey, title: 'Phụ cấp' }])
        setData(data.map(e => ({ ...e, [`phuCapUnit${nextKey}`]: '%', [`phuCapValue${nextKey}`]: 'PC', children: e.children.map((c) => ({...c, [`phuCapUnit${nextKey}`]: null })) })))

    }

    const updatePcColTitle = (key, val) => {
        setPcCols(pcCols.map(e => (e.key === key ? { ...e, title: val } : e)))
    }

    const deletePcCol = key => {
        setPcCols(pcCols.filter(e => e.key !== key))
    }
    const { columns } = useColumns({
        deletePcCol,
        deleteSection,
        setAddMode,
        addMode,
        updatePcColTitle,
        addNewPcCol,
        pcCols,
        onClickAddChild,
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
        editingKey,
        edit,
        save,
        cancel,
        initialDataRef,
        applyForData,
        setApplyForData,
        toDown,
        toUp,
        initialSalary,
        setInitialSalary,
        setLuongKhoiDiem
    })
    useEffect(() => {
        if (listCellNeedUpdate.current) {
            listCellNeedUpdate.current.map(([path, value]) => setDataValue(path, value))
            listCellNeedUpdate.current = []
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCellNeedUpdate.current])
    const [addOverlayBounding, setAddOverlayBounding] = useState([])
    const wrapperBoundingRef = useRef(null)
    useEffect(() => {
        if (addMode) {
            const startBounding = document.querySelector('#addElStart').getBoundingClientRect()
            const endRowBouding = document.querySelector('#addElEnd').getBoundingClientRect()
            const wrapperBouding = wrapperBoundingRef.current.getBoundingClientRect()
            setAddOverlayBounding([
                startBounding.top - wrapperBouding.top,
                wrapperBouding.bottom - endRowBouding.bottom
            ])
            window.scrollTo({
                top: startBounding.top,
                left: startBounding.left,
                behavior: 'smooth'
            })
        }
    }, [addMode])

    const getAddId = record => {
        if (record.key === `${data.length}`) {
            return 'addElStart'
        }
        if (record.key === `${data.length}.${data.at(-1).children.length}`) {
            return 'addElEnd'
        }
        return undefined
    }

    const onChangeFilterNgachLuong = (val) => {
        const filterData = []
        filterData.push(data.find((_data) => _data.key == val ))
        // filterData.push(data[1])
        setData(filterData)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className='bang-ngach-luong-1'>
            <div ref={wrapperBoundingRef} className='bang-ngach-luong-1__table'>
                <div
                    className='add-overlay'
                    style={{
                        height: addOverlayBounding[0],
                        visibility: addMode ? 'hidden' : 'hidden'
                    }}
                />
                <div className='table__header'>
                    <Select
                        placeholder="Chọn..."
                        options={filterSection}
                        onChange={val => {
                            onChangeFilterNgachLuong(val)
                        }}
                    />
                    <div className='table__header__text'>
                        <span>Giá trị lương khởi điểm</span>
                        <Select bordered={false} value={luongKhoiDiem} onChange={(val) => setLuongKhoiDiem(val)}>
                            {initialSalary.map((data) => {
                                return <Option key={data.value} value={data.value}>{data.value}</Option>
                            })}
                        </Select>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    expandable={{
                        expandedRowRender: () => null,
                        expandIcon: () => <></>,
                        expandedRowKeys: expandedKeys,
                        expandIconColumnIndex: -1,
                        indentSize: 0
                    }}
                    onHeaderRow={() => ({ style: { px: 0 } })}
                    onRow={record => {
                        return {
                            onMouseEnter: () => {
                                setHoverKey(record.key)
                            }, // mouse enter row
                            onMouseLeave: () => {
                                setHoverKey(null)
                            }, // mouse leave row
                            style: { fontWeight: isHeSoAvgRow(record) ? 'bold' : 'normal' },
                            id: addMode ? getAddId(record) : undefined
                        }
                    }}
                />
            </div>
            <Button className='button-add' onClick={onClickAddNewNL} disabled={isEditMode}>
                + Thêm ngạch lương
            </Button>
        </div>
    )
}

export default PayGrades01
