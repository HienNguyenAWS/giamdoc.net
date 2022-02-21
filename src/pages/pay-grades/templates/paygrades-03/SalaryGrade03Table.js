/* eslint-disable indent */
import { ExclamationCircleOutlined, MoreOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popover, Select, Table } from 'antd'
import { ReactComponent as AddActiveIcon } from 'assets/images/add-active.svg'
import { ReactComponent as AddIcon } from 'assets/images/add.svg'
import { ReactComponent as CloseIcon } from './icons/close.svg'
import { ReactComponent as CheckIcon } from './icons/check.svg'
import { ReactComponent as BonusActiveIcon } from 'assets/images/topnav/bonus-active.svg'
import withActiveIcon from 'components/withHoverIcon'
import { rowsMock } from 'pages/pay-grades/initialize-data/_mock03'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { formatCurrency } from 'utils/PayGradesHelper'
import StartingSalaryDropdown from './actions/StartingSalaryDropdown'
import { deletePayGrade } from './PayGrades03.action'
import styles from './SalaryGrade03Table.module.scss'

const WithActiveAddIcon = withActiveIcon(AddIcon)

const getCloneCols = cols => cols.map(e => ({ ...e }))

const createColumnsMock = ({ level, amplitude, coefficient }) => {
    const columnsMock = []

    for (let i = 1; i <= level; i++) {
        columnsMock.push({
            label: `Bậc ${i}`,
            key: `level${i}`,
            value: {
                amplitude,
                coefficient: coefficient + amplitude * (i - 1)
            }
        })
    }

    return columnsMock
}

const createFirstRow = ({ salary, columnsData, titleTable }) => {
    let firstRow = {}

    columnsData.forEach(({ key, value }) => {
        firstRow = {
            ...firstRow,
            [key]: {
                label: (
                    <div className={styles.lightColor}>
                        <div>{value.amplitude}</div>
                        <div>{value.coefficient}</div>
                    </div>
                ),
                value: {
                    key,
                    value
                }
            }
        }
    })

    return {
        key: 0,
        code: titleTable,
        title: '',
        rules: salary,
        amplitudeAndCoefficient: (
            <div className={styles.lightColor}>
                <div>Biên độ</div>
                <div>Hệ số</div>
            </div>
        ),
        ...firstRow
    }
}

const createSummaryRow = ({ columnsData, rows }) => {
    const totalSalaryByKey = ({ rows, key }) =>
        rows.reduce((sum, row) => {
            for (const rowKey in row) {
                if (rowKey === key) {
                    sum += row[key].value
                }
            }
            return sum
        }, 0)

    let summaryRow = {
        key: rows.length + 1,
        code: 'QLDH',
        title: 'Tổng lương và phụ cấp',
        rules: '',
        amplitudeAndCoefficient: ''
    }

    columnsData.forEach(({ key }) => {
        summaryRow = {
            ...summaryRow,
            [key]: {
                label: formatCurrency(totalSalaryByKey({ rows, key })),
                value: totalSalaryByKey({ rows, key })
            }
        }
    })

    return summaryRow
}

const calcSalaryByRule = ({ salary, row, columnData }) => {
    switch (row.rules) {
        case 'LVT':
        case 'LKĐ / hoặc LTT':
            return {
                [columnData.key]: {
                    label: formatCurrency(columnData.value.coefficient * salary),
                    value: columnData.value.coefficient * salary
                }
            }

        case 'VD: 30% LCB':
            return {
                [columnData.key]: {
                    label: formatCurrency(columnData.value.coefficient * (0.3 * salary)),
                    value: columnData.value.coefficient * (0.3 * salary)
                }
            }
    }
}

const createRestRows = ({ salary, columnsData, rowsData }) => {
    const createDataRow = ({ salary, columnsData, row, index }) => {
        const { code, title, rules, amplitudeAndCoefficient } = row
        let restRow = {
            key: index + 1,
            code,
            title,
            rules,
            amplitudeAndCoefficient
        }

        columnsData.forEach(columnData => {
            restRow = {
                ...restRow,
                ...calcSalaryByRule({ salary, row, columnData })
            }
        })

        return restRow
    }

    let restRow = []
    rowsData.forEach((row, index) => {
        restRow.push(createDataRow({ salary, columnsData, row, index }))
    })

    restRow.push({})
    restRow.push(createSummaryRow({ columnsData, rows: restRow }))

    return restRow
}

const createDataSource = ({ salary, columnsData, rowsData, titleTable }) => {
    const dataSource = [
        createFirstRow({ salary, columnsData, titleTable }),
        ...createRestRows({ salary, columnsData, rowsData })
    ]

    return dataSource
}

const createAmplitudeAndCoefficient = ({
    columnsData,
    handleAddColumn,
    handleRemoveColumn,
    levelSalaryDataIndex,
    setLevelSalaryDataIndex
}) => {
    let amplitudeAndCoefficient = []

    columnsData.forEach(({ label, key }) => {
        amplitudeAndCoefficient = [
            ...amplitudeAndCoefficient,
            {
                title: (
                    <div className={styles.salaryLevel}>
                        <CloseIcon
                            className={clsx({
                                vVisiable: levelSalaryDataIndex === key
                            })}
                            onClick={handleRemoveColumn}
                        />
                        {label}
                    </div>
                ),
                dataIndex: key,
                align: 'center',

                onHeaderCell: column => ({
                    onMouseEnter: () => {
                        setLevelSalaryDataIndex(column.dataIndex)
                    },
                    onMouseLeave: () => {
                        setLevelSalaryDataIndex(null)
                    }
                }),

                render: text => text?.label
            }
        ]
    })

    return [
        ...amplitudeAndCoefficient,
        {
            title: (
                <div style={{ marginLeft: 10 }}>
                    <WithActiveAddIcon activeIcon={AddActiveIcon} onClick={handleAddColumn} />
                </div>
            ),
            fixed: 'right'
        }
    ]
}

const isExistClickedColumn = titleTableList => {
    for (const key in titleTableList) {
        if (titleTableList[key].isClicked) {
            return true
        }
    }
    return false
}

const createColumns = ({
    salary,
    columnsData,
    rowsData,
    setDataValue,
    setSalary,
    handleAddColumn,
    handleRemoveColumn,
    levelSalaryDataIndex,
    setLevelSalaryDataIndex,
    titleTableList,
    setTitleTableList,
    handleTitleTableSave,
    handleTitleTableCancel,
    handleAddRow,
    handleDeleteRow,
    visiable,
    setVisiable,
    handleRowTableSave,
    handleRowTableCancel,
    rowTableEditing,
    setRowTableEditing,
    indexRowTableDelete,
    handleDeleteSession
}) => {
    const columns = [
        {
            title: titleTableList.code.isHovered ? (
                <>
                    {titleTableList.code.isClicked && (
                        <div className={styles.flexCenterVertical}>
                            <Input
                                autoFocus
                                onFocus={event => event.target.select()}
                                value={titleTableList.code.title}
                                onChange={event => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                    newTitleTableList.code.title = event.target.value
                                    setTitleTableList(newTitleTableList)
                                }}
                            />

                            <div className={styles.actions}>
                                <CheckIcon
                                    onClick={() => {
                                        handleTitleTableSave('code')
                                    }}
                                />
                                <CloseIcon
                                    onClick={() => {
                                        handleTitleTableCancel('code')
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <div
                        className={clsx(styles.titleTableList, {
                            dNone: titleTableList.code.isClicked
                        })}
                    >
                        {titleTableList.code.title}
                        <EditOutlined
                            className={clsx({
                                dNone: !titleTableList.code.isHovered || isExistClickedColumn(titleTableList)
                            })}
                            onClick={() => {
                                const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                newTitleTableList.code.isClicked = true
                                setTitleTableList(newTitleTableList)
                            }}
                        />
                    </div>
                </>
            ) : titleTableList.code.isClicked ? (
                <div className={styles.flexCenterVertical}>
                    <Input
                        autoFocus
                        onFocus={event => event.target.select()}
                        value={titleTableList.code.title}
                        onChange={event => {
                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                            newTitleTableList.code.title = event.target.value
                            setTitleTableList(newTitleTableList)
                        }}
                    />

                    <div className={styles.actions}>
                        <CheckIcon
                            onClick={() => {
                                handleTitleTableSave('code')
                            }}
                        />
                        <CloseIcon
                            onClick={() => {
                                handleTitleTableCancel('code')
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.titleTableList}>{titleTableList.code.title}</div>
            ),
            dataIndex: 'code',
            align: 'left',
            colSpan: 2,
            width: 140,
            fixed: 'left',

            onHeaderCell: () => ({
                onMouseEnter: () => {
                    setTitleTableList(preState => {
                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                        newTitleTableList.code.isHovered = true
                        return newTitleTableList
                    })
                },
                onMouseLeave: () => {
                    setTitleTableList(preState => {
                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                        newTitleTableList.code.isHovered = false
                        return newTitleTableList
                    })
                }
            }),

            render: (text, record, index) => {
                if (index === 0) {
                    return rowTableEditing?.rowIndex === index && rowTableEditing?.isClicked ? (
                        <div className={styles.flexCenterVertical}>
                            <Input
                                autoFocus
                                onFocus={event => event.target.select()}
                                value={text}
                                onChange={event => {
                                    setDataValue('setTitleTable', event.target.value)
                                }}
                            />

                            <div className={styles.actions}>
                                <CheckIcon onClick={handleRowTableSave} />
                                <CloseIcon onClick={handleRowTableCancel} />
                            </div>
                        </div>
                    ) : (
                        !!text && (
                            <div className={styles.flexCenterVertical}>
                                <BonusActiveIcon className={styles.bonusActiveIcon} />

                                {text}
                                {!rowTableEditing?.isClicked && (
                                    <EditOutlined
                                        style={{
                                            marginLeft: 3
                                        }}
                                        onClick={() => {
                                            setRowTableEditing({
                                                rowIndex: index,
                                                isClicked: true
                                            })
                                        }}
                                    />
                                )}
                                <Popover
                                    visible={visiable}
                                    onVisibleChange={setVisiable}
                                    className={styles.popover}
                                    content={
                                        <div className={styles.bnl1Popover}>
                                            <Button
                                                type='text'
                                                danger
                                                onClick={() => {
                                                    setVisiable(false)
                                                    handleDeleteSession()
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button type='text'>Config</Button>
                                        </div>
                                    }
                                    trigger='click'
                                >
                                    <Button icon={<MoreOutlined />} type='text' />
                                </Popover>
                            </div>
                        )
                    )
                }

                if (index === rowsData.length + 1) {
                    return <WithActiveAddIcon activeIcon={AddActiveIcon} onClick={handleAddRow} />
                }

                if (index !== rowsData.length + 2) {
                    return (
                        <div className={styles.rowDelete}>
                            <CloseIcon
                                className={clsx({
                                    vVisiable: indexRowTableDelete === index
                                })}
                                onClick={() => {
                                    handleDeleteRow(index)
                                }}
                            />
                            {text}
                        </div>
                    )
                }

                if (text) {
                    return text
                }
            }
        },
        {
            title: '',
            dataIndex: 'title',
            align: 'left',
            colSpan: 0,
            width: 200,
            fixed: 'left',

            render: (text, record, index) => {
                if (index !== rowsData.length + 1) {
                    return rowTableEditing?.rowIndex === index && rowTableEditing?.isClicked ? (
                        <div className={styles.flexCenterVertical}>
                            <Input
                                autoFocus
                                onFocus={event => event.target.select()}
                                value={text}
                                onChange={event => {
                                    setDataValue(`${index - 1}.title`, event.target.value)
                                }}
                            />

                            <div className={styles.actions}>
                                <CheckIcon onClick={handleRowTableSave} />
                                <CloseIcon onClick={handleRowTableCancel} />
                            </div>
                        </div>
                    ) : (
                        !!text && (
                            <div className={styles.flexCenterVertical}>
                                {text}
                                {!rowTableEditing?.isClicked && (
                                    <EditOutlined
                                        style={{
                                            marginLeft: 3
                                        }}
                                        onClick={() => {
                                            setRowTableEditing({
                                                rowIndex: index,
                                                isClicked: true
                                            })
                                        }}
                                    />
                                )}
                            </div>
                        )
                    )
                }

                return text
            }
        },
        {
            title: titleTableList.rules.isHovered ? (
                <>
                    {titleTableList.rules.isClicked && (
                        <div className={styles.flexCenterVertical}>
                            <Input
                                autoFocus
                                onFocus={event => event.target.select()}
                                value={titleTableList.rules.title}
                                onChange={event => {
                                    const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                    newTitleTableList.rules.title = event.target.value
                                    setTitleTableList(newTitleTableList)
                                }}
                            />

                            <div className={styles.actions}>
                                <CheckIcon
                                    onClick={() => {
                                        handleTitleTableSave('rules')
                                    }}
                                />
                                <CloseIcon
                                    onClick={() => {
                                        handleTitleTableCancel('rules')
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <div
                        className={clsx(styles.titleTableList, {
                            dNone: titleTableList.rules.isClicked
                        })}
                    >
                        {titleTableList.rules.title}
                        <EditOutlined
                            className={clsx({
                                dNone: !titleTableList.rules.isHovered || isExistClickedColumn(titleTableList)
                            })}
                            onClick={() => {
                                const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                                newTitleTableList.rules.isClicked = true
                                setTitleTableList(newTitleTableList)
                            }}
                        />
                    </div>
                </>
            ) : titleTableList.rules.isClicked ? (
                <div className={styles.flexCenterVertical}>
                    <Input
                        autoFocus
                        onFocus={event => event.target.select()}
                        value={titleTableList.rules.title}
                        onChange={event => {
                            const newTitleTableList = JSON.parse(JSON.stringify(titleTableList))
                            newTitleTableList.rules.title = event.target.value
                            setTitleTableList(newTitleTableList)
                        }}
                    />

                    <div className={styles.actions}>
                        <CheckIcon
                            onClick={() => {
                                handleTitleTableSave('rules')
                            }}
                        />
                        <CloseIcon
                            onClick={() => {
                                handleTitleTableCancel('rules')
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.titleTableList}>{titleTableList.rules.title}</div>
            ),
            dataIndex: 'rules',
            align: 'center',
            width: 120,
            fixed: 'left',

            onHeaderCell: () => ({
                onMouseEnter: () => {
                    setTitleTableList(preState => {
                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                        newTitleTableList.rules.isHovered = true
                        return newTitleTableList
                    })
                },
                onMouseLeave: () => {
                    setTitleTableList(preState => {
                        const newTitleTableList = JSON.parse(JSON.stringify(preState))
                        newTitleTableList.rules.isHovered = false
                        return newTitleTableList
                    })
                }
            }),

            render: (text, record, index) => {
                if (index === 0) {
                    return (
                        <StartingSalaryDropdown
                            startingSalary={salary}
                            options={[
                                { id: 1, label: '4.500.000 đ', value: 4500000 },
                                { id: 2, label: '6.500.000 đ', value: 6500000 }
                            ]}
                            onSalaryChange={newSalary => {
                                setSalary(newSalary)
                            }}
                        />
                    )
                }
                return text
            }
        },
        {
            title: '',
            dataIndex: 'amplitudeAndCoefficient',
            align: 'center',
            width: 120,
            fixed: 'left'
        },
        ...createAmplitudeAndCoefficient({
            columnsData,
            handleAddColumn,
            handleRemoveColumn,
            levelSalaryDataIndex,
            setLevelSalaryDataIndex
        })
    ]

    return columns
}

const SalaryGrade03Table = ({ id, titleTable: _titleTable, ...restProps }) => {
    const [levelSalary, setLevelSalary] = useState({
        level: 7,
        amplitude: 0.25,
        coefficient: 1
    })

    const [levelSalaryDataIndex, setLevelSalaryDataIndex] = useState(null)
    const [titleTableList, setTitleTableList] = useState({
        code: {
            title: 'Ngạch bậc lương',
            isHovered: false,
            isClicked: false
        },
        rules: {
            title: 'Quy tắc',
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

    const [rowTableEditing, setRowTableEditing] = useState(null)
    const [indexRowTableDelete, setIndexRowTableDelete] = useState(null)

    const [visiable, setVisiable] = useState(false)

    const dispatch = useDispatch()

    const [columnsData, setColumnsData] = useState(getCloneCols(createColumnsMock(levelSalary)))
    const [rowsData, setRowsData] = useState(getCloneCols(rowsMock))
    const [titleTable, setTitleTable] = useState(_titleTable)

    const rowsDataRef = useRef(getCloneCols(rowsMock))
    const titleTableRef = useRef(_titleTable)

    const [visiableAddRow, setVisiableAddRow] = useState(false)
    const submitAddRowBtnRef = useRef(null)
    const [form] = Form.useForm()

    const handleAddrowOk = () => {
        submitAddRowBtnRef.current.click()
    }

    const handleAddrowCancel = () => {
        setVisiableAddRow(false)
    }

    const handleAddColumn = () => {
        const newLevelSalary = { ...levelSalary }
        newLevelSalary.level += 1
        setLevelSalary(newLevelSalary)
    }

    const handleRemoveColumn = () => {
        const newLevelSalary = { ...levelSalary }
        newLevelSalary.level -= 1
        setLevelSalary(newLevelSalary)
    }

    const handleAddRow = () => {
        setVisiableAddRow(true)
    }

    const handleDeleteRow = index => {
        Modal.confirm({
            title: 'Confirm delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete this row?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: close => {
                setRowsData([...rowsData].filter((rowData, dataIndex) => dataIndex !== index - 1))
                close()
            }
        })
    }

    const handleAddRowSubmit = formValues => {
        const rowData = {
            code: 'N1-LCB',
            title: formValues.title,
            rules: formValues.rule,
            amplitudeAndCoefficient: ''
        }
        form.resetFields()
        setRowsData([...rowsData, rowData])
        setVisiableAddRow(false)
    }

    const setDataValue = (path, value) => {
        if (path === 'setTitleTable') {
            setTitleTable(value)
        } else {
            const [index, dataIndex] = path.split('.')
            const newData = [...rowsData]
            newData[index][dataIndex] = value
            setRowsData(newData)
        }
    }

    const handleRowTableSave = () => {
        rowsDataRef.current = getCloneCols(rowsData)
        titleTableRef.current = titleTable
        setRowTableEditing(null)
    }

    const handleRowTableCancel = () => {
        setRowsData(getCloneCols(rowsDataRef.current))
        setTitleTable(titleTableRef.current)
        setRowTableEditing(null)
    }

    const handleDeleteSession = () => {
        Modal.confirm({
            title: 'Confirm delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete this section?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: close => {
                dispatch(deletePayGrade(id))
                close()
            }
        })
    }

    const [salary, setSalary] = useState(4_500_000)

    const [dataSource, setDataSource] = useState(
        createDataSource({ salary, columnsData, rowsData, handleAddRow, titleTable })
    )

    const columns = createColumns({
        salary,
        columnsData,
        rowsData,
        setDataValue,
        setSalary,
        handleAddColumn,
        handleRemoveColumn,
        levelSalaryDataIndex,
        setLevelSalaryDataIndex,
        titleTableList,
        setTitleTableList,
        handleTitleTableSave,
        handleTitleTableCancel,
        handleAddRow,
        handleDeleteRow,
        visiable,
        setVisiable,
        handleRowTableSave,
        handleRowTableCancel,
        rowTableEditing,
        setRowTableEditing,
        indexRowTableDelete,
        setIndexRowTableDelete,
        handleDeleteSession
    })

    useLayoutEffect(() => {
        setColumnsData(createColumnsMock(levelSalary))
    }, [levelSalary])

    useLayoutEffect(() => {
        setDataSource(createDataSource({ salary, columnsData, rowsData, titleTable }))
    }, [salary, titleTable, rowsData, columnsData])

    useLayoutEffect(() => {
        const colspanElements = document.querySelectorAll(
            `.${styles.salaryGrade03} tbody > tr:nth-child(2) > td:nth-child(1)`
        )
        const hiddenElements = document.querySelectorAll(
            `.${styles.salaryGrade03} tbody > tr:nth-child(2) > td:nth-child(2)`
        )

        colspanElements.forEach(element => {
            element.setAttribute('colspan', 2)
        })
        hiddenElements.forEach(element => {
            element.style.display = 'none'
        })
    })

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                {...restProps}
                pagination={false}
                className={styles.salaryGrade03}
                rowClassName={(record, index) => index === dataSource.length - 1 && styles.summaryRow}
                scroll={{ x: 'max-content', y: 260 }}
                onRow={(record, index) => ({
                    onMouseEnter: () => {
                        setIndexRowTableDelete(index)
                    },
                    onMouseLeave: () => {
                        setIndexRowTableDelete(-1)
                    }
                })}
            />

            <Modal
                title='Thêm dữ liệu'
                visible={visiableAddRow}
                okText='Thêm'
                cancelText='Huỷ'
                onOk={handleAddrowOk}
                onCancel={handleAddrowCancel}
            >
                <Form onFinish={handleAddRowSubmit} form={form}>
                    <Form.Item
                        label='Tiêu đề'
                        name='title'
                        rules={[{ required: true, message: 'Tiêu đề không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Quy tắc'
                        name='rule'
                        rules={[{ required: true, message: 'Quy tắc không được để trống!' }]}
                    >
                        <Select placeholder='Chọn quy tắc tính lương'>
                            <Select.Option value='LKĐ / hoặc LTT'>LKĐ / hoặc LTT</Select.Option>
                            <Select.Option value='VD: 30% LCB'>VD: 30% LCB</Select.Option>
                            <Select.Option value='LVT'>LVT</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ display: 'none' }}>
                        <Button ref={submitAddRowBtnRef} htmlType='submit' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SalaryGrade03Table
