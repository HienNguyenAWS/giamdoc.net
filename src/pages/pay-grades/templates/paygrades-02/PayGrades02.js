import { Button, Select, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { generateNewNL } from 'utils/PayGrades02Helper'
import { data as _initialData, pcCols as _pcCols } from 'pages/pay-grades/initialize-data/_mock02'
import 'pages/pay-grades/PayGrades.scss'
import { useColumns } from './useColumns'
import {
    STARTING_SALARY_ONE_TITLE,
    STARTING_SALARY_ONE_VALUE,
    STARTING_SALARY_TWO_TITLE,
    STARTING_SALARY_TWO_VALUE
} from 'constants/constants'

const { Option } = Select

const getCloneData = (data) =>
    data.map((r, parentIdx) => ({
        ...r,
        key: `${parentIdx + 1}`,
        children: r.children.map((e, childIdx) => ({ ...e, key: `${parentIdx+1}.${childIdx+1}` }))
    }))

const getCloneCols = (cols) => cols.map((e) => ({ ...e }))
const transformData = (d) => {
    d.forEach((r) => {
        r.children.push({ key: `${r.key}.${r.children.length + 1}`, salaryScale: 'add' })
    })
    return d
}
const initialData = transformData(_initialData)

export const PayGrades02 = () => {
    // const [currentTab, setCurrentTab] = useState('ngach-bac-luong')
    // const handleClickTab = (e) => {
    //     setCurrentTab(e.key)
    // }

    const [expandedKeys, setExpandedKeys] = useState(initialData.map((e) => e.key))
    const [editingKey, setEditingKey] = useState('')
    const [luongKhoiDiem, setLuongKhoiDiem] = useState(4_500_000)
    const [data, setData] = useState(initialData)
    const [pcCols, setPcCols] = useState(_pcCols)
    const initialDataRef = useRef(getCloneData(initialData))
    const initialPcColRef = useRef(getCloneCols(_pcCols))
    const [hoverKey, setHoverKey] = useState(null)
    const listCellNeedUpdate = useRef([])
    const [addMode, setAddMode] = useState(false)

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

    const isEditing = (record) => !!(record.key === editingKey || record.key.startsWith(`${editingKey}.`))
    const isEditMode = !!editingKey
    const isHeSoAvgRow = (record) => {
        const [parentKey, childKey] = record.key.split('.')
        return !!childKey && parseFloat(record.coefficient) === parseFloat(data[parentKey - 1].coefficientAvg)
    }
    const edit = (record) => {
        setEditingKey(record.key)
        if (!expandedKeys.includes(record.key)) toggleExpandedKeys(record.key)
    }

    const cancel = () => {
        setEditingKey('')
        setData(getCloneData(initialDataRef.current.slice()))
        setAddMode(false)
    }
    
    const deleteSection = (record) => {
        const newData = data.filter((e) => e.key !== record.key)
        setData(getCloneData(newData))
        initialDataRef.current = getCloneData(newData)
    }

    const toggleExpandedKeys = (key) => {
        setExpandedKeys((prev) => {
            const outArr = [...prev]
            if (outArr.includes(key)) {
                return outArr.filter((e) => e !== key)
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
        const newNL = generateNewNL(data)
        edit(newNL)
        setData(getCloneData([...data, newNL]))
        setAddMode(true)
    }

    const onClickDeleteChild = (record) => {
        const [parentKey] = record.key.split('.')
        const siblingsLength = data[parentKey - 1].children.length
        let newChildren = data[parentKey - 1].children.filter((c) => c.key !== record.key)
        newChildren = newChildren.map((c, idx) => {
            return { ...c, key: `${parentKey}.${idx + 1}` }
        })
        setDataValue(`${parentKey}.children`, newChildren)
        if ((siblingsLength - 8) % 2 === 0) {
            setDataValue(
                `${parentKey}.coefficientAvg`,
                parseFloat(data[parentKey - 1].coefficientAvg) - parseFloat(data[parentKey - 1].coefficient[1])
            )
        }
    }

    const addNewPcCol = () => {
        const newIdx = pcCols.length + 1
        setPcCols([...pcCols, { title: `Phụ cấp ${newIdx}` }])
        setData(data.map((e) => ({ ...e, [`phuCapUnit${newIdx}`]: '%', [`phuCapValue${newIdx}`]: 'PC' })))
    }

    const updatePcColTitle = (index, val) => {
        setPcCols(pcCols.map((e, idx) => (idx === index ? { ...e, title: val } : e)))
    }

    const { columns } = useColumns({
        setAddMode,
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
    return (
        <div className="bang-ngach-luong-2">
            <div ref={wrapperBoundingRef} className='bang-ngach-luong-2__table'>
                <div
                    className='add-overlay'
                    style={{
                        height: addOverlayBounding[0],
                        visibility: addMode ? 'hidden' : 'hidden'
                    }}
                />
                <div className="table__header">
                    <Select size="small" defaultValue={'1'}>
                        <Option value="1">Chọn...</Option>
                    </Select>
                    <div className="table__header__text">
                        <span>Giá trị lương khởi điểm</span>
                        <Select bordered={false} value={luongKhoiDiem} onChange={(val) => setLuongKhoiDiem(val)}>
                            <Option value={STARTING_SALARY_ONE_VALUE}>{STARTING_SALARY_ONE_TITLE}</Option>
                            <Option value={STARTING_SALARY_TWO_VALUE}>{STARTING_SALARY_TWO_TITLE}</Option>
                        </Select>
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content', y: window.innerHeight * 0.6 }}
                    pagination={false}
                    expandable={{
                        expandedRowRender: () => null,
                        expandIcon: () => <></>,
                        expandedRowKeys: expandedKeys,
                        expandIconColumnIndex: -1,
                        indentSize: 0
                    }}
                    onHeaderRow={() => ({ style: { px: 0 } })}
                    onRow={(record) => {
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
            <Button className="button-add" onClick={onClickAddNewNL} disabled={isEditMode}>
				+ Thêm ngạch lương
            </Button>
        </div>
    )
}

export default PayGrades02