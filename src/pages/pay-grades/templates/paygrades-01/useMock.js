import {
    EditOutlined,
    MoreOutlined,
    PlusCircleOutlined,
    SortAscendingOutlined,
    UpOutlined,
    DownOutlined,
    MinusCircleOutlined
} from '@ant-design/icons'
import { Button, Select, Space } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import styles from 'pages/pay-grades/PayGrades.scss'

const { Option } = Select

const _data = [
    {
        key: '1',
        'ngach-luong': '2',
        index: '1',
        'bac-luong': 'QLDH',
        'he-so': [3, 0.4],
        'luong-vi-tri': 'LVT',
        'trong-do': ['%LCB', 'LCB', '%KPI', 'L(KPI)'],
        'phu-cap-01': ['%', 'PC'],
        tong: 'LVT+PC',
        'ghi-chu': ''
    }
]
const _columns = (cb, toggleExpandedKeys, expandedKeys) => [
    {
        title: 'Ngach luong',
        dataIndex: 'ngach-luong',
        width: 100,
        align: 'center',
        render: (text, record) => (
            <Space>
                <Button icon={expandedKeys.includes(record.key) ? <UpOutlined /> : <DownOutlined /> } type="text" onClick={() => toggleExpandedKeys(record.key)}/>
                <Button icon={<SortAscendingOutlined />} type="text" />
                <Button icon={<MoreOutlined />} type="text" />
            </Space>
        )
    },
    {
        title: '#',
        dataIndex: 'index',
        align: 'center',
        width: 50
    },
    {
        title: 'Bac luong',
        dataIndex: 'bac-luong',
        align: 'center',
        width: 100
    },
    {
        title: 'He so',
        dataIndex: 'he-so',
        align: 'center',
        width: 100,
        render: (text) => (
            <>
                <span>
                    {text[0]}
                    <Button type="text" icon={<EditOutlined />} size="small" />
                </span>
				|
                <span style={{ marginLeft: 4 }}>
                    {text[1]}
                    <Button type="text" icon={<EditOutlined />} size="small" />
                </span>
            </>
        )
    },
    {
        title: 'Luong vi tri',
        dataIndex: 'luong-vi-tri',
        align: 'center',
        className: styles.columnBorderRight,
        width: 100
    },
    {
        title: 'Trong do',
        dataIndex: 'trong-do',
        width: 340,
        align: 'center',
        className: clsx(styles.columnBorderRight, styles.cellPadddingNone),
        render: (text) => (
            <>
                {text.map((e, index) => (
                    <span style={{ width: index%2 ? 95: 74, textAlign: 'center', display: 'inline-block' }} key={e}>
                        {e}
                    </span>
                ))}
            </>
        )
    },
    {
        title: 'Phu cap 01',
        dataIndex: 'phu-cap-01',
        align: 'center',
        width: 170,
        render: (text) => (
            <Space align="start">
                <Select defaultValue={text[0]} style={{ width: 70 }}>
                    <Option value="%">%</Option>
                    <Option value="VND">VND</Option>
                </Select>
                <span>
                    {text[1]}
                    <Button type="text" icon={<EditOutlined />} size="small" />
                </span>
                <Button type="text" icon={<PlusCircleOutlined />} size="small" onClick={cb} />
            </Space>
        )
    },
    {
        title: 'Tong (Gom PC)',
        align: 'center',
        dataIndex: 'tong',
        width: 120
    },
    {
        title: 'Ghi chu/ Tham chieu',
        dataIndex: 'ghi-chu',
        align: 'center'
    }
]
export const useMock = ({ expandedKeys, toggleExpandedKeys }) => {
    const [columns, setColumns] = useState([])
    const [addFlag, setAddFlag] = useState(false)
    const [deleteIdx, setDeleteIdx] = useState(-1)
    const [count, setCount] = useState(1)
    const deleteColumn = (idx) => {
        setDeleteIdx(idx)
    }
    useEffect(() => {

        setColumns(_columns(() => setAddFlag(true), toggleExpandedKeys, expandedKeys))
    }, [expandedKeys, toggleExpandedKeys])
    useEffect(() => {
        if (addFlag) {
            let lastIndex = columns
                .slice()
                .reverse()
                .findIndex((e) => e.dataIndex.includes('phu-cap'))
            lastIndex = columns.length - lastIndex
            const newColumns = [...columns]
            const newColumn = {
                title: `Phu cap ${count + 1}`,
                dataIndex: 'phu-cap-01',
                align: 'center',
                width: 150,
                render: (text) => (
                    <Space align="start">
                        <Select defaultValue={text[0]} style={{ width: 70 }}>
                            <Option value="%">%</Option>
                            <Option value="VND">VND</Option>
                        </Select>
                        <span>
                            {text[1]}
                            <Button type="text" icon={<EditOutlined />} size="small" />
                        </span>
                        <Button type="text" icon={<PlusCircleOutlined />} size="small" onClick={() => setAddFlag(true)} />
                    </Space>
                )
            }
            newColumns.splice(lastIndex, 0, newColumn)
            setColumns(
                newColumns.map((e, idx) => {
                    if (e.dataIndex.includes('phu-cap') && idx !== lastIndex) {
                        return {
                            ...e,
                            render: (text) => (
                                <Space align="start">
                                    <Select defaultValue={text[0]} style={{ width: 70 }}>
                                        <Option value="%">%</Option>
                                        <Option value="VND">VND</Option>
                                    </Select>
                                    <span>
                                        {text[1]}
                                        <Button type="text" icon={<EditOutlined />} size="small" />
                                    </span>
                                    <Button type="text" icon={<MinusCircleOutlined />} size="small" onClick={() => deleteColumn(idx)} />
                                </Space>
                            )
                        }
                    }
                    return e
                })
            )

            setAddFlag(false)
            setCount(count + 1)
        }
    }, [addFlag, columns, count])
    useEffect(() => {
        if (deleteIdx !== -1) {
            const newCol = [...columns]
            newCol.splice(deleteIdx, 1)
            setColumns(newCol)
            setDeleteIdx(-1)
        }
    }, [deleteIdx, columns])
    return {
        data: _data,
        columns
    }
}
