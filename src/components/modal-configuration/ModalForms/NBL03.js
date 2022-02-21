import React, { useState } from 'react'
import { Checkbox, Divider, Form, Input, Radio, Button } from 'antd'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Giám đốc', 'Trợ lý giám đốc', 'Quản lý điều hành', 'Nhân viên']
const defaultCheckedList = ['Giám đốc']

const NBL03 = ({ salary, setSalary, salaryConfigs, setSalaryConfigs }) => {
    const [form] = Form.useForm()
    const { TextArea } = Input

    const onFinish = values => {
        console.log('Success:', values)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const onClose = () => {}

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            form={form}
            layout='horizontal'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item label='Quy tắc' className='collection-create-form_last-form-item'>
                <Radio.Group onChange={null} value={salary?.type}>
                    <Radio value={1}>LKĐ</Radio>
                    <Radio value={2}>LTT</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label='Lương KPI tính theo'>
                <Radio.Group onChange={null}>
                    <Radio value={1}>%</Radio>
                    <Radio value={2}>Giá trị (VNĐ)</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label='Phụ cấp'>
                <Radio.Group onChange={null}>
                    <Radio value={1}>%</Radio>
                    <Radio value={2}>Giá trị (VNĐ)</Radio>
                </Radio.Group>
            </Form.Item>

            {/*
            <Form.Item label='Lương phụ cấp (%)'>
                <Input value={1} onChange={null} />
            </Form.Item>

            <Form.Item label='Áp dụng cho'>
                <CheckboxGroup options={plainOptions} value={1} onChange={null} />
                <Checkbox indeterminate={1} onChange={null} checked={1} style={{ marginTop: '10px' }}>
                    Check all
                </Checkbox>
            </Form.Item>

            <Form.Item label='Ghi chú'>
                <TextArea rows={3} value={1} onChange={null} />
            </Form.Item>
            */}

            <Form.Item label='Tính lương theo' className='collection-create-form_last-form-item'>
                <Radio.Group onChange={null} value={salary?.type}>
                    <Radio value={1}>LKĐ</Radio>
                    <Radio value={2}>LTT</Radio>
                </Radio.Group>
            </Form.Item>

            <Divider />

            <Form.Item className='modal-footer' style={{ marginBottom: '0' }}>
                <Button type='primary' htmlType='submit' style={{ marginRight: '8px' }}>
                    Update
                </Button>
                <Button htmlType='button' onClick={onClose}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}

export default NBL03
