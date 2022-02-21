import { Button, Table } from 'antd'
import { data as _initialData, pcCols as _pcCols, titleCols as _titleCols } from 'pages/piecework-payment/initialize-data/_mock'
import 'pages/piecework-payment/PieceworkPayment.scss'
import React, { useEffect, useRef, useState } from 'react'
import { generateNewChild, generateNewPW } from 'utils/PieceworkHelper'
import { useColumns } from './useColumns'

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

const PieceworkPaymentDetail = () => {
    const [expandedKeys, setExpandedKeys] = useState(initialData.map(e => e.key))
    const [editingKey, setEditingKey] = useState('')
    const [data, setData] = useState(initialData)
    const [pcCols, setPcCols] = useState(_pcCols)
    const countPcCols = useRef(1)
    const initialDataRef = useRef(getCloneData(initialData))
    const initialPcColRef = useRef(getCloneCols(_pcCols))
    const [hoverKey, setHoverKey] = useState(null)
    const listCellNeedUpdate = useRef([])
    const [addMode, setAddMode] = useState(false)
    const [titleCols, setTitleCols] = useState(_titleCols)

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
    const edit = record => {
        setEditingKey(record.key)
        if (!expandedKeys.includes(record.key)) toggleExpandedKeys(record.key)
    }

    const cancel = () => {
        setEditingKey('')
        setData(initialDataRef.current.slice())
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
        const newNL = generateNewPW(data)
        edit(newNL)
        setData(getCloneData([...data, newNL]))
        setAddMode(true)
    }

    const onClickAddChild = parentKey => {
        const siblings = data[parentKey - 1].children
        const currentLength = siblings.length
        setDataValue(`${parentKey}.children.${currentLength}`, generateNewChild(siblings))
        setDataValue(`${parentKey}.children.${currentLength + 1}`, {
            key: `${parentKey}.${currentLength + 1}`,
            index: 'add'
        })
    }

    const onClickDeleteChild = record => {
        const [parentKey] = record.key.split('.')
        let newChildren = data[parentKey - 1].children.filter(c => c.key !== record.key)
        newChildren = newChildren.map((c, idx) => {
            return { ...c, key: `${parentKey}.${idx + 1}` }
        })
        setDataValue(`${parentKey}.children`, newChildren)
        // if ((siblingsLength - 8) % 2 === 0) {
        //     const avg = parseFloat(data[parentKey - 1].heSo[0])
        //     const jump = parseFloat(data[parentKey - 1].heSo[1])
        //     setDataValue(`${parentKey}.heSo`, [avg - jump, jump])
        // }
    }

    const deleteSection = record => {
        const newData = data.filter(e => e.key !== record.key)
        setData(getCloneData(newData))
        initialDataRef.current = getCloneData(newData)
    }

    const addNewPcCol = () => {
        const nextKey = ++countPcCols.current
        setPcCols([...pcCols, { key: nextKey, title: `Phụ cấp ${nextKey}` }])
        setData(data.map(e => ({ ...e, [`phuCapUnit${nextKey}`]: '%', [`phuCapValue${nextKey}`]: 'PC' })))
    }

    const updateTitleCol = (key, val) => {
        setTitleCols(titleCols.map(e => (e.key === key ? { ...e, title: val } : e)))
    }

    const deletePcCol = key => {
        setTitleCols(pcCols.filter(e => e.key !== key))
    }
    const { columns } = useColumns({
        deletePcCol,
        deleteSection,
        setAddMode,
        addMode,
        updateTitleCol,
        addNewPcCol,
        pcCols,
        onClickAddChild,
        onClickDeleteChild,
        isEditMode,
        hoverKey,
        listCellNeedUpdate,
        setDataValue,
        data,
        isEditing,
        expandedKeys,
        toggleExpandedKeys,
        editingKey,
        edit,
        save,
        titleCols,
        cancel
    })
    useEffect(() => {
        if (listCellNeedUpdate.current) {
            listCellNeedUpdate.current.map(([path, value]) => setDataValue(path, value))
            listCellNeedUpdate.current = []
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCellNeedUpdate.current])
    // useEffect(() => {
    //     console.log(data[0].heSo, data[0].children);
    //     // console.log(data);
    // }, [data]);
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
        <div className='piecework-payment'>
            <div ref={wrapperBoundingRef} className='piecework-payment__table'>
                <div
                    className='add-overlay'
                    style={{
                        height: addOverlayBounding[0],
                        visibility: addMode ? 'visible' : 'hidden'
                    }}
                />

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
                    onRow={record => {
                        return {
                            onMouseEnter: () => {
                                setHoverKey(record.key)
                            }, // mouse enter row
                            onMouseLeave: () => {
                                setHoverKey(null)
                            }, // mouse leave row
                            id: addMode ? getAddId(record) : undefined
                        }
                    }}
                />
            </div>
            <Button className='button-add' onClick={onClickAddNewNL}>
                + Thêm công đoạn
            </Button>
        </div>
    )
}

export default PieceworkPaymentDetail
