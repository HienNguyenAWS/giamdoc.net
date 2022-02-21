import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React, { useEffect } from 'react'
import { formatCurrency } from 'utils/PayGradesHelper'
import styles from './../SalaryGrade03Table.module.scss'

const SalaryDropdown = ({ salary, setSalary }) => {
    const handleSalaryChange = value => {
        const newSalary = { ...salary }
        newSalary.label = formatCurrency(value)
        newSalary.value = value
        setSalary(newSalary)
    }

    useEffect(() => {
        if (!salary.label || !salary.value) {
            const newSalary = { ...salary }
            newSalary.label = newSalary.list[0].label
            newSalary.value = newSalary.list[0].value
            setSalary(newSalary)
        }
    }, [salary, setSalary])

    return (
        <>
            <div>{salary.type === 1 ? 'Lương khởi điểm' : 'Lương tối thiểu'}</div>

            <Dropdown
                overlay={
                    <Menu>
                        {salary.list.map(({ label, value }, index) => (
                            <Menu.Item key={index} onClick={() => handleSalaryChange(value)}>
                                <span>{label}</span>
                            </Menu.Item>
                        ))}
                    </Menu>
                }
            >
                <span className={styles.cursorPointer}>
                    {salary.label} <DownOutlined />
                </span>
            </Dropdown>
        </>
    )
}

export default SalaryDropdown
