import { Button, Checkbox, Divider, Form, Input, Radio } from 'antd'
import clsx from 'clsx'
import withActiveIcon from 'components/withHoverIcon'
import { ReactComponent as CheckIcon } from 'components/modal-configuration/icons/check.svg'
import { ReactComponent as CloseIcon } from 'components/modal-configuration/icons/close.svg'
import { ReactComponent as CancelIcon } from 'components/modal-configuration/icons/cancel.svg'
import styles from 'pages/pay-grades/templates/paygrades-03/SalaryGrade03Table.module.scss'
import React, { useState } from 'react'
import { formatCurrency } from 'utils/PayGradesHelper'
import { ReactComponent as AddIcon } from 'assets/images/add.svg'
import { ReactComponent as AddActiveIcon } from 'assets/images/add-active.svg'

const CheckboxGroup = Checkbox.Group

const WithActiveAddIcon = withActiveIcon(AddIcon)

const defaultSalaryKeys = ['lcb', 'lkpi', 'lvt']

const NBL03 = ({ salary, setSalary, salaryConfigs, setSalaryConfigs }) => {
    const [form] = Form.useForm()

    const [salaryType, setSalaryType] = useState(salary.type)
    const handleSalaryTypeChange = (event) => {
        setSalaryType(event.target.value)
    }

    const [salaryList, setSalaryList] = useState(salary.list)
    const handleSalaryListChange = (event, index) => {
        const newSalaryList = [...salaryList]
        newSalaryList[index] = {
            label: formatCurrency(parseInt(event.target.value)),
            value: parseInt(event.target.value)
        }
        setSalaryList(newSalaryList)
    }

    const handleRemoveSalaryList = (index) => {
        const newSalaryList = [...salaryList].filter((salary, _index) => _index !== index)
        setSalaryList(newSalaryList)
    }

    const [isAddSalaryList, setIsAddSalaryList] = useState(false)
    const [newValueSalaryList, setNewValueSalaryList] = useState(0)
    const handleAddSalaryListTrigger = () => {
        setIsAddSalaryList(true)
    }
    const handleNewValueSalaryListChange = (event) => {
        setNewValueSalaryList(event.target.value)
    }
    const handleAddSalaryList = () => {
        const newValueSalaryListInteger = parseInt(newValueSalaryList)
        if (newValueSalaryListInteger) {
            const newSalaryList = [...salaryList]
            newSalaryList.push({
                label: formatCurrency(newValueSalaryListInteger),
                value: newValueSalaryListInteger
            })
            setSalaryList(newSalaryList)
            setNewValueSalaryList(0)
            setIsAddSalaryList(false)
        }
    }
    const handleRemoveNewValueSalaryList = () => {
        setNewValueSalaryList(0)
        setIsAddSalaryList(false)
    }

    const [kpiSalaryType, setKpiSalaryType] = useState(salaryConfigs.lkpi.percent ? 1 : 2)
    const handleKpiSalaryTypeChange = (event) => {
        setKpiSalaryType(event.target.value)
    }

    const [kpiSalaryPercent, setKpiSalaryPercent] = useState(salaryConfigs.lkpi.percent)
    const handleKpiSalaryPercentChange = (event) => {
        setKpiSalaryPercent(event.target.value)
    }
    const [kpiSalaryValue, setKpiSalaryValue] = useState(salaryConfigs.lkpi.value)
    const handleKpiSalaryValueChange = (event) => {
        setKpiSalaryValue(event.target.value)
    }

    const onFinish = (values) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const onClose = () => {}

    //   pc1: {
    //     title: 'Tiền ăn trưa',
    //     value: 190000
    // }

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Cách tính lương"
                className={`collection-create-form_last-form-item ${styles.formItemMarginBottom4}`}
            >
                <Radio.Group onChange={handleSalaryTypeChange} value={salaryType}>
                    <Radio value={1}>LKĐ</Radio>
                    <Radio value={2}>LTT</Radio>
                </Radio.Group>
            </Form.Item>

            {salaryList.map((salary, index) => (
                <Form.Item
                    key={index}
                    label="dummy"
                    className={`collection-create-form_last-form-item
                                ${styles.hiddenFormLabel}
                                ${styles.formItemMarginBottom4}`}
                >
                    <div className={styles.flexCenter}>
                        <Input value={salary.value} onChange={(event) => handleSalaryListChange(event, index)} />
                        <Button
                            icon={<CloseIcon />}
                            disabled={salaryList.length === 1}
                            onClick={() => handleRemoveSalaryList(index)}
                        />
                    </div>
                </Form.Item>
            ))}

            <Form.Item
                label="dummy"
                className={clsx(
                    `collection-create-form_last-form-item ${styles.hiddenFormLabel} ${styles.formItemMarginBottom4}`,
                    {
                        dNone: !isAddSalaryList
                    }
                )}
            >
                <div className={styles.flexCenter}>
                    <Input value={newValueSalaryList} onChange={handleNewValueSalaryListChange} />

                    <Button icon={<CheckIcon />} onClick={handleAddSalaryList} />
                    <Button icon={<CancelIcon />} onClick={handleRemoveNewValueSalaryList} />
                </div>
            </Form.Item>

            <Form.Item label="dummy" className={`collection-create-form_last-form-item ${styles.hiddenFormLabel}`}>
                <div className={styles.flexCenter}>
                    <WithActiveAddIcon activeIcon={AddActiveIcon} onClick={handleAddSalaryListTrigger} />
                </div>
            </Form.Item>

            <Form.Item label="Lương KPI tính theo" className="collection-create-form_last-form-item">
                <Radio.Group onChange={handleKpiSalaryTypeChange} value={kpiSalaryType}>
                    <Radio value={1}>%</Radio>
                    <Radio value={2}>Giá trị (VNĐ)</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label={kpiSalaryType === 1 ? 'Phần trăm lương KPI' : 'Giá trị lương KPI'}>
                <Input
                    onChange={kpiSalaryType === 1 ? handleKpiSalaryPercentChange : handleKpiSalaryValueChange}
                    value={kpiSalaryType === 1 ? kpiSalaryPercent : kpiSalaryValue}
                />
            </Form.Item>

            {Object.keys(salaryConfigs).map((key) => {
                if (!defaultSalaryKeys.includes(key)) {
                    return (
                        <Form.Item label={salaryConfigs[key].title} style={{ marginBottom: 0 }}>
                            <Input onChange={null} value={salaryConfigs[key].value} />
                        </Form.Item>
                    )
                }
            })}

            <Divider />

            <Form.Item className="modal-footer" style={{ marginBottom: '0' }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                    Update
                </Button>
                <Button htmlType="button" onClick={onClose}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NBL03
