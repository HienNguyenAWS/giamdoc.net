import { Form, Input } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './../SalaryGrade03Table.module.scss'
import { EditableContext } from './EditableRow'

const EditableCell = ({ title, editable, children, dataIndex, record, ...restProps }) => {
    console.log({ children })
    console.log({ record })

    return (
        <td {...restProps}>
            {editable ? (
                <Form.Item
                    className={styles.formItem}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`
                        }
                    ]}
                >
                    <Input value={children} />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

export default EditableCell
