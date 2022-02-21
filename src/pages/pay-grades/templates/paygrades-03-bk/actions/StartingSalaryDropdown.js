import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styles from './../SalaryGrade03Table.module.scss'

const StartingSalaryDropdown = props => {
    const [startingSalary, setStartingSalary] = useState(props.startingSalary)

    const handleMenuClick = newSalary => {
        setStartingSalary(newSalary)
    }

    useEffect(() => {
        if (props.onSalaryChange) {
            props.onSalaryChange(startingSalary)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startingSalary])

    return (
        <>
            <Dropdown
                overlay={
                    <Menu>
                        {props.options.map(({ id, label, value }) => (
                            <Menu.Item key={id} onClick={() => handleMenuClick(value)}>
                                <span>{label}</span>
                            </Menu.Item>
                        ))}
                    </Menu>
                }
            >
                <span className={styles.cursorPointer}>
                    Khởi điểm <DownOutlined />
                </span>
            </Dropdown>
            <div>{startingSalary}</div>
        </>
    )
}

StartingSalaryDropdown.propTypes = {
    startingSalary: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    onSalaryChange: PropTypes.func
}

StartingSalaryDropdown.defaultProps = {
    onSalaryChange: null
}

export default StartingSalaryDropdown
