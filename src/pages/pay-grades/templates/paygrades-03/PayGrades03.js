import React, { useRef, useState } from 'react'
import Button from 'components/Button'
import SalaryGrade03Table from './SalaryGrade03Table'
import styles from './SalaryGrade03Table.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectPayGrades } from './PayGrades03.selector'
import { Modal, Form, Input, Button as AntButton } from 'antd'
import { addPayGrade } from './PayGrades03.action'

const PayGrades03 = () => {
    const dispatch = useDispatch()
    const payGrades = useSelector(selectPayGrades)
    const submitBtnRef = useRef(null)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        submitBtnRef.current.click()
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = formValues => {
        dispatch(addPayGrade(formValues))
    }

    return (
        <>
            <div>
                {payGrades.map(payGradeImutable => {
                    const payGrade = payGradeImutable.toObject()
                    return <SalaryGrade03Table key={payGrade.id} {...payGrade} />
                })}
            </div>

            <Button isHighlight className={styles.addButton} onClick={showModal}>
                + Thêm ngạch lương
            </Button>

            <Modal
                title='Thêm ngạch lương'
                visible={isModalVisible}
                okText='Thêm'
                cancelText='Huỷ'
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        label='Tiêu đề bảng'
                        name='titleTable'
                        rules={[{ required: true, message: 'Tiêu đề bảng không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ display: 'none' }}>
                        <AntButton ref={submitBtnRef} htmlType='submit' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PayGrades03
