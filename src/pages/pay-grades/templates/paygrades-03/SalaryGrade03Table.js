/* eslint-disable indent */
import { EditOutlined, ExclamationCircleOutlined, MoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popover, Select, Table } from 'antd'
import { ReactComponent as AddActiveIcon } from 'assets/images/add-active.svg'
import { ReactComponent as AddIcon } from 'assets/images/add.svg'
import { ReactComponent as BonusActiveIcon } from 'assets/images/topnav/bonus-active.svg'
import clsx from 'clsx'
import withActiveIcon from 'components/withHoverIcon'
import { rowsMock, salary as _salary } from 'pages/pay-grades/initialize-data/_mock03'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { formatCurrency } from 'utils/PayGradesHelper'
import SalaryDropdown from './actions/SalaryDropdown'
import { ReactComponent as CheckIcon } from './icons/check.svg'
import { ReactComponent as CloseIcon } from './icons/close.svg'
import { deletePayGrade } from './PayGrades03.action'
import styles from './SalaryGrade03Table.module.scss'
import ModalConfiguration3 from 'components/modal-configuration/ModalConfiguration3'
import NBL03 from 'components/modal-configuration/ModalForms/NBL03'

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

const createFirstRow = ({ salary, columnsData, titleTable, amplitudeAndCoefficient, setAmplitudeAndCoefficient }) => {
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
        rules: salary.value,
        amplitudeAndCoefficient,
        ...firstRow
    }
}

const createSummaryRow = ({ columnsData, rows, summaryTable, setSummaryTable }) => {
    const totalSalaryByKey = ({ rows, key }) =>
        rows.reduce((sum, row) => {
            for (const rowKey in row) {
                if (rowKey === key && !['lcb', 'lkpi'].includes(row.rules.key)) {
                    sum += row[key].value
                }
            }
            return sum
        }, 0)

    let summaryRow = {
        key: rows.length + 1,
        code: 'QLDH',
        title: summaryTable,
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

const mapRowsDataByConfig = ({ salary, salaryConfigs, rowsData }) => {
    const defaultSalaryKeys = ['lcb', 'lkpi', 'lvt']

    return rowsData.map(rowData => {
        switch (rowData.rules.key) {
            case 'lcb': {
                rowData.rules.title = 'LKĐ hoặc LTT'
                rowData.rules.label = formatCurrency(salary.value)
                rowData.rules.value = salary.value
                break
            }

            case 'lkpi': {
                if (salaryConfigs.lkpi.percent) {
                    rowData.rules.title = `${salaryConfigs.lkpi.percent}% LCB`
                    rowData.rules.label = formatCurrency((salaryConfigs.lkpi.percent / 100) * salary.value)
                    rowData.rules.value = (salaryConfigs.lkpi.percent / 100) * salary.value
                } else {
                    rowData.rules.label = formatCurrency(salaryConfigs.value)
                    rowData.rules.value = salaryConfigs.value
                }
                break
            }

            case 'lvt': {
                if (salaryConfigs.lkpi.percent) {
                    rowData.rules.label = formatCurrency(
                        salary.value + (salaryConfigs.lkpi.percent / 100) * salary.value
                    )
                    rowData.rules.value = salary.value + (salaryConfigs.lkpi.percent / 100) * salary.value
                } else {
                    rowData.rules.label = formatCurrency(salary.value + salaryConfigs.value)
                    rowData.rules.value = salary.value + salaryConfigs.value
                }
                rowData.rules.title = 'Tổng của LCB và LKPI'
                break
            }
        }

        for (const key of Object.keys(salaryConfigs)) {
            if (!defaultSalaryKeys.includes(key)) {
                if (rowData.rules.key === key) {
                    rowData.rules.title = salaryConfigs[key].title
                    rowData.rules.label = formatCurrency(salaryConfigs[key].value)
                    rowData.rules.value = salaryConfigs[key].value
                }
            }
        }

        return rowData
    })
}

const calcSalaryByLevel = ({ row, columnData }) => ({
    [columnData.key]: {
        label: formatCurrency(row.rules.value * columnData.value.coefficient),
        value: row.rules.value * columnData.value.coefficient
    }
})

const createRestRows = ({ salary, columnsData, rowsData, summaryTable, setSummaryTable }) => {
    const createDataRow = ({ columnsData, row, index }) => {
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
                ...calcSalaryByLevel({ row, columnData })
            }
        })

        return restRow
    }

    let restRow = []
    rowsData.forEach((row, index) => {
        restRow.push(createDataRow({ salary, columnsData, row, index }))
    })

    restRow.push({})
    restRow.push(createSummaryRow({ columnsData, rows: restRow, summaryTable, setSummaryTable }))

    return restRow
}

const createDataSource = ({
    salary,
    columnsData,
    rowsData,
    titleTable,
    amplitudeAndCoefficient,
    setAmplitudeAndCoefficient,
    summaryTable,
    setSummaryTable
}) => {
    const dataSource = [
        createFirstRow({ salary, columnsData, titleTable, amplitudeAndCoefficient, setAmplitudeAndCoefficient }),
        ...createRestRows({ salary, columnsData, rowsData, summaryTable, setSummaryTable })
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
    columnsData,
    rowsData,
    setDataValue,
    salary,
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
    amplitudeAndCoefficient,
    setAmplitudeAndCoefficient,
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
                                            <Button
                                                icon={<SettingOutlined />}
                                                onClick={() => {
                                                    setVisiable(false)
                                                }}
                                                type='text'
                                            />
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
                                    vVisiable: indexRowTableDelete === index && !rowTableEditing?.isClicked
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
                                    if (index === rowsData.length + 2) {
                                        setDataValue('setSummaryTable', event.target.value)
                                    } else {
                                        setDataValue(`${index - 1}.title`, event.target.value)
                                    }
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
                        className={clsx(styles.titleTableList, styles.titleTableListCenter, {
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
                <div className={(styles.titleTableList, styles.titleTableListCenter)}>{titleTableList.rules.title}</div>
            ),
            dataIndex: 'rules',
            align: 'center',
            width: 160,
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
                    return <SalaryDropdown salary={salary} setSalary={setSalary} />
                }

                if (text?.title) {
                    return text.title
                }

                return text
            }
        },
        {
            title: '',
            dataIndex: 'amplitudeAndCoefficient',
            align: 'center',
            fixed: 'left',
            width: 120,

            render: text => {
                if (text) {
                    return (
                        <div className={styles.lightColor}>
                            {!text.amplitude.isClicked && !text.coefficient.isClicked && (
                                <div>
                                    <div>
                                        {text.amplitude.title}
                                        <EditOutlined
                                            className={clsx({
                                                dNone: text.amplitude.isClicked
                                            })}
                                            style={{
                                                marginLeft: 3
                                            }}
                                            onClick={() => {
                                                setAmplitudeAndCoefficient(preState => {
                                                    const newState = JSON.parse(JSON.stringify(preState))
                                                    newState.amplitude.isClicked = true
                                                    return newState
                                                })
                                            }}
                                        />
                                    </div>

                                    <div>
                                        {text.coefficient.title}
                                        <EditOutlined
                                            className={clsx({
                                                dNone: text.coefficient.isClicked
                                            })}
                                            style={{
                                                marginLeft: 3
                                            }}
                                            onClick={() => {
                                                setAmplitudeAndCoefficient(preState => {
                                                    const newState = JSON.parse(JSON.stringify(preState))
                                                    newState.coefficient.isClicked = true
                                                    return newState
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div
                                className={clsx(styles.flexCenterVertical, {
                                    dNone: !text.amplitude.isClicked && !text.coefficient.isClicked
                                })}
                            >
                                <Input
                                    autoFocus
                                    onFocus={event => event.target.select()}
                                    value={text.amplitude.isClicked ? text.amplitude.title : text.coefficient.title}
                                    onChange={event => {
                                        text.amplitude.isClicked
                                            ? setDataValue('setAmplitude', event.target.value)
                                            : setDataValue('setCoefficient', event.target.value)
                                    }}
                                />

                                <div className={styles.actions}>
                                    <CheckIcon onClick={handleRowTableSave} />
                                    <CloseIcon onClick={handleRowTableCancel} />
                                </div>
                            </div>
                        </div>
                    )
                }
            }
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
    const [salary, setSalary] = useState(_salary)
    const [salaryConfigs, setSalaryConfigs] = useState({
        lkpi: {
            title: '30% LCB',
            percent: 30,
            value: 0
        },
        pc1: {
            title: 'Tiền ăn trưa',
            percent: 0,
            value: 190000
        }
    })

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
    const [rowsData, setRowsData] = useState(
        getCloneCols(
            mapRowsDataByConfig({
                salary,
                salaryConfigs,
                rowsData: rowsMock
            })
        )
    )
    const [titleTable, setTitleTable] = useState(_titleTable)
    const [summaryTable, setSummaryTable] = useState('Tổng lương và phụ cấp')
    const [amplitudeAndCoefficient, setAmplitudeAndCoefficient] = useState({
        amplitude: {
            title: 'Biên độ',
            isClicked: false
        },
        coefficient: {
            title: 'Hệ số',
            isClicked: false
        }
    })
    const amplitudeAndCoefficientRef = useRef(amplitudeAndCoefficient)

    const rowsDataRef = useRef(getCloneCols(rowsMock))
    const titleTableRef = useRef(_titleTable)
    const summaryTableRef = useRef(summaryTable)

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
        switch (path) {
            case 'setTitleTable': {
                setTitleTable(value)
                break
            }

            case 'setSummaryTable': {
                setSummaryTable(value)
                break
            }

            case 'setAmplitude': {
                setAmplitudeAndCoefficient(preState => {
                    const newState = JSON.parse(JSON.stringify(preState))
                    newState.amplitude.title = value
                    return newState
                })
                break
            }

            case 'setCoefficient': {
                setAmplitudeAndCoefficient(preState => {
                    const newState = JSON.parse(JSON.stringify(preState))
                    newState.coefficient.title = value
                    return newState
                })
                break
            }

            default: {
                const [index, dataIndex] = path.split('.')
                const newData = [...rowsData]
                newData[index][dataIndex] = value
                setRowsData(newData)
                break
            }
        }
    }

    const handleRowTableSave = () => {
        rowsDataRef.current = getCloneCols(rowsData)
        titleTableRef.current = titleTable
        summaryTableRef.current = summaryTable

        const newAmplitudeAndCoefficient = JSON.parse(JSON.stringify(amplitudeAndCoefficient))
        newAmplitudeAndCoefficient.amplitude.isClicked = false
        newAmplitudeAndCoefficient.coefficient.isClicked = false
        amplitudeAndCoefficientRef.current = newAmplitudeAndCoefficient
        setAmplitudeAndCoefficient(newAmplitudeAndCoefficient)

        setRowTableEditing(null)
    }

    const handleRowTableCancel = () => {
        setRowsData(getCloneCols(rowsDataRef.current))
        setTitleTable(titleTableRef.current)
        setSummaryTable(summaryTableRef.current)

        const newAmplitudeAndCoefficient = JSON.parse(JSON.stringify(amplitudeAndCoefficientRef.current))
        newAmplitudeAndCoefficient.amplitude.isClicked = false
        newAmplitudeAndCoefficient.coefficient.isClicked = false
        amplitudeAndCoefficientRef.current = newAmplitudeAndCoefficient
        setAmplitudeAndCoefficient(newAmplitudeAndCoefficient)

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

    const [dataSource, setDataSource] = useState(
        createDataSource({
            salary,
            columnsData,
            rowsData,
            handleAddRow,
            titleTable,
            amplitudeAndCoefficient,
            setAmplitudeAndCoefficient,
            summaryTable,
            setSummaryTable
        })
    )

    const columns = createColumns({
        columnsData,
        rowsData,
        setDataValue,
        salary,
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
        amplitudeAndCoefficient,
        setAmplitudeAndCoefficient,
        handleDeleteSession
    })

    useLayoutEffect(() => {
        setColumnsData(createColumnsMock(levelSalary))
    }, [levelSalary])

    useLayoutEffect(() => {
        setDataSource(
            createDataSource({
                salary,
                columnsData,
                rowsData,
                titleTable,
                amplitudeAndCoefficient,
                setAmplitudeAndCoefficient,
                summaryTable,
                setSummaryTable
            })
        )
    }, [
        salary,
        titleTable,
        rowsData,
        columnsData,
        amplitudeAndCoefficient,
        setAmplitudeAndCoefficient,
        summaryTable,
        setSummaryTable
    ])

    useEffect(() => {
        const scrollWrapperElements = document.querySelectorAll('.ant-table-body')
        const tableWidthElements = document.querySelectorAll('.ant-table-body > table')

        scrollWrapperElements.forEach((scrollWrapperElement, index) => {
            scrollWrapperElement.scrollTo(tableWidthElements[index].offsetWidth + 64, 0)
        })
    }, [levelSalary])

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

            {/* <ModalConfiguration3
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
            /> */}
            <ModalConfiguration3 />

            <Modal title='Thêm dữ liệu' visible okText='Thêm' cancelText='Huỷ'>
                <NBL03
                    salary={salary}
                    setSalary={setSalary}
                    salaryConfigs={salaryConfigs}
                    setSalaryConfigs={setSalaryConfigs}
                />
            </Modal>
        </>
    )
}

export default SalaryGrade03Table
