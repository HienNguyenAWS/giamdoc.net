/* eslint-disable indent */
import { ExclamationCircleOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popover, Select, Space, Table } from 'antd'
import { ReactComponent as AddActiveIcon } from 'assets/images/add-active.svg'
import { ReactComponent as AddIcon } from 'assets/images/add.svg'
import { ReactComponent as BonusActiveIcon } from 'assets/images/topnav/bonus-active.svg'
import withActiveIcon from 'components/withHoverIcon'
import { columnsMock, rowsMock } from 'pages/pay-grades/initialize-data/_mock03'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { formatCurrency } from 'utils/PayGradesHelper'
import StartingSalaryDropdown from './actions/StartingSalaryDropdown'
import { deletePayGrade } from './PayGrades03.action'
// import { selectAmplitude, selectCoefficient, selectLevel } from './PayGrades03.selector'
import styles from './SalaryGrade03Table.module.scss'

const WithActiveAddIcon = withActiveIcon(AddIcon)

const getCloneCols = cols => cols.map(e => ({ ...e }))

// const createColumnsMock = (level, amplitude, coefficient) => {
//     const columnsMock = []

//     for (let i = 1; i <= level; i++) {
//         columnsMock.push({
//             label: `Bậc ${i}`,
//             key: `level${i}`,
//             value: {
//                 amplitude,
//                 coefficient: coefficient * i
//             }
//         })
//     }

//     return columnsMock
// }

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

const createAmplitudeAndCoefficient = ({ columnsData, handleAddColumn }) => {
    let amplitudeAndCoefficient = []

    columnsData.forEach(({ label, key }) => {
        amplitudeAndCoefficient = [
            ...amplitudeAndCoefficient,
            {
                title: label,
                dataIndex: key,
                align: 'center',
                render: text => text?.label
            }
        ]
    })

    return [
        ...amplitudeAndCoefficient,
        {
            title: <WithActiveAddIcon activeIcon={AddActiveIcon} onClick={handleAddColumn} />,
            fixed: 'right'
        }
    ]
}

const createColumns = ({
    salary,
    columnsData,
    rowsData,
    setDataValue,
    setSalary,
    handleAddColumn,
    handleAddRow,
    isEditingMode,
    setIsEditingMode,
    visiable,
    setVisiable,
    handleSave,
    handleCancel,
    handleDeleteSession
}) => {
    const columns = [
        {
            title: isEditingMode ? (
                <Space>
                    <Button onClick={handleCancel}>Huỷ</Button>
                    <Button type='primary' onClick={handleSave}>
                        Lưu
                    </Button>
                </Space>
            ) : (
                'Ngạch bậc lương'
            ),
            dataIndex: 'code',
            align: 'left',
            colSpan: 2,
            width: 120,
            fixed: 'left',
            render: (text, record, index) => {
                if (index === 0) {
                    return isEditingMode ? (
                        <div className={styles.flexCenterVertical}>
                            <BonusActiveIcon className={styles.bonusActiveIcon} />

                            <Input
                                value={text}
                                onChange={event => {
                                    setDataValue('setTitleTable', event.target.value)
                                }}
                            />
                        </div>
                    ) : (
                        <div className={styles.flexCenterVertical}>
                            <BonusActiveIcon className={styles.bonusActiveIcon} />
                            {text}
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
                                        <Button
                                            type='text'
                                            onClick={() => {
                                                setVisiable(false)
                                                setIsEditingMode(true)
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                }
                                trigger='click'
                            >
                                <Button icon={<MoreOutlined />} type='text' disabled={false} />
                            </Popover>
                        </div>
                    )
                }

                if (index === rowsData.length + 1) {
                    return <WithActiveAddIcon activeIcon={AddActiveIcon} onClick={handleAddRow} />
                }
                return text
            }
        },
        {
            title: '',
            dataIndex: 'title',
            align: 'left',
            colSpan: 0,
            width: 200,
            editable: isEditingMode,
            fixed: 'left',
            render: (text, record, index) => {
                if (index !== rowsData.length + 1) {
                    return isEditingMode ? (
                        <Input
                            value={text}
                            onChange={event => {
                                setDataValue(`${index - 1}.title`, event.target.value)
                            }}
                        />
                    ) : (
                        text
                    )
                }
                return text
            }
        },
        {
            title: 'Quy tắc',
            dataIndex: 'rules',
            align: 'center',
            fixed: 'left',
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
            fixed: 'left'
        },
        ...createAmplitudeAndCoefficient({ columnsData, handleAddColumn })
    ]

    return columns
}

const SalaryGrade03Table = ({ id, titleTable: _titleTable, ...restProps }) => {
    const [visiable, setVisiable] = useState(false)

    // const level = useSelector(selectLevel)
    // const amplitude = useSelector(selectAmplitude)
    // const coefficient = useSelector(selectCoefficient)
    const dispatch = useDispatch()

    const [isEditingMode, setIsEditingMode] = useState(false)
    const [columnsData, setColumnsData] = useState(getCloneCols(columnsMock))
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

    // const handleAddColumn = () => {
    //     dispatch(addLevel())
    // }

    const handleAddColumn = () => {
        const newColumData = {
            label: `Bậc ${columnsData.length + 1}`,
            key: `level${columnsData.length + 1}`,
            value: {
                amplitude: 0.25,
                coefficient: 1 + columnsData.length * 0.25
            }
        }

        setColumnsData([...columnsData, newColumData])
    }

    const handleAddRow = () => {
        setVisiableAddRow(true)
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

    const handleSave = () => {
        setIsEditingMode(false)
        rowsDataRef.current = getCloneCols(rowsData)
        titleTableRef.current = titleTable
    }

    const handleCancel = () => {
        setIsEditingMode(false)
        setRowsData(rowsDataRef.current)
        setTitleTable(titleTableRef.current)
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
        handleAddRow,
        isEditingMode,
        setIsEditingMode,
        visiable,
        setVisiable,
        handleSave,
        handleCancel,
        handleDeleteSession
    })

    // useEffect(() => {
    //     setColumnsData(createColumnsMock(level, amplitude, coefficient))
    // }, [level, amplitude, coefficient])

    useEffect(() => {
        setDataSource(createDataSource({ salary, columnsData, rowsData, titleTable }))
    }, [salary, titleTable, rowsData, columnsData])

    useEffect(() => {
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
                scroll={{ x: 'max-content' }}
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
