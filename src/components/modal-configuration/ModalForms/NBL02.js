import React, { useState } from 'react'
import { Checkbox, Divider, Form, Input, Radio, Button, Space } from 'antd'
import { initDataValue } from 'pages/pay-grades/initialize-data/_masterData'
import { applyForData } from 'pages/pay-grades/initialize-data/_masterData'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import '../ModalConfiguration.scss'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Giám đốc', 'Trợ lý giám đốc', 'Quản lý điều hành', 'Nhân viên']
// const defaultCheckedList = ['Giám đốc']

const NBL02 = ( { recordInfo, setData }) => {

    console.log(initDataValue)

    const [coefficient, setCoefficient] = useState(recordInfo.coefficient[0])
    const [jump, setCoefficientJump] = useState(recordInfo.coefficient[1])
    const [coefficientFlg, setCoefficientFlg] = useState(recordInfo.coefficientFlg)
    const [kpi, setKpi] = useState(recordInfo.kpiDefault)
    const [allowance, setAllowance] = useState(recordInfo.allowanceDefault)
    const [applyFor, setApplyFor] = useState(recordInfo.applyFor)
    const [note, setNote] = useState(recordInfo.note)
    const [status, setStatus] = useState(1)
    const [indeterminate, setIndeterminate] = React.useState(true)
    const [checkAll, setCheckAll] = React.useState(false)

    const [form] = Form.useForm()
    const { TextArea } = Input

    // const onChangeIntValue = (e) => {
    //     setCoefficient(e.target.value)
    // }

    const onChangeCoefficient = (e) => {
        setCoefficient(e.target.value)
    }

    const onChangeJump = (e) => {
        setCoefficientJump(e.target.value)
    }

    const onChangeCoefficientFlg = (e) => {
        console.log(e.target.value)
        setCoefficientFlg(e.target.value)
    }

    const onChangeKpi = (e) => {
        setKpi(e.target.value)
    }

    const onChangeAllowance = (e) => {
        setAllowance(e.target.value)
    }

    const onChangeNote = (e) => {
        setNote(e.target.value)
    }

    const onChangeStatus = e => {
        setStatus(e.target.value)
    }

    const onChangeApplyFor = list => {
        setApplyFor(list)
        setIndeterminate(!!list.length && list.length < plainOptions.length)
        setCheckAll(list.length === plainOptions.length)
    }

    const onCheckAllApplyFor = e => {
        setApplyFor(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
    }

    const onChangeInitValue = e => {
        console.log('radio checked', e.target.value)
        // this.setState({
        //     value: e.target.value
        // })
    }


    const onFinish = (values) => {
        setData(`${recordInfo.key}.coefficient`, [coefficient, jump])
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const onClose = () => {
        console.log('aaaa')
    }

    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            form={form}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
                label="Giá trị lương khởi điểm"
            >
                {initDataValue.map((data => {
                    <Input />
                }))}
            </Form.Item> */}

            <Form.List
            >
                {(initDataValue, { add, remove }, { errors }) => (
                    <>
                        <Form.Item
                            label="Giá trị lương khởi điểm"
                        >
                            {initDataValue.map((field, index) => (
                                <Form.Item
                                    key={field.key}
                                    style={{ marginBottom: '5px' }}
                                >
                                    {/* <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input passenger\'s name or delete this field.'
                                            }
                                        ]}
                                        style={{ marginBottom: '5px' }}
                                    > */}
                                    <Input value={field.value} style={{ width: '85%' }} />
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                </Form.Item>
                                // </Form.Item>
                            ))}
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Thêm giá trị
                            </Button>
                        </Form.Item>
                        <Form.ErrorList errors={errors} />
                    </>
                )}
            </Form.List>

            <Form.Item label="Hệ số & bước nhảy" style={{ marginBottom: 0 }}>
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(50% - 20px)' }}
                >
                    <Input onChange={onChangeCoefficient} value={coefficient} />
                </Form.Item>
                <Form.Item
                    style={{ display: 'inline-block', width: '50%', margin: '0 8px' }}
                >
                    <Input onChange={onChangeJump} value={jump} />
                </Form.Item>
            </Form.Item>

            <Form.Item
                label="Set giá trị hệ số"
                className="collection-create-form_last-form-item">
                <Radio.Group onChange={onChangeCoefficientFlg} value={coefficientFlg}>
                    <Radio value={1}>Trung tâm</Radio>
                    <Radio value={2}>Khởi điểm</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Lương KPI (%)"
            >
                <Input value={kpi} onChange={onChangeKpi} />
            </Form.Item>

            <Form.Item
                label="Lương phụ cấp (%)"
            >
                <Input value={allowance} onChange={onChangeAllowance} />
            </Form.Item>

            <Form.Item
                label="Áp dụng cho"
            >
                <CheckboxGroup options={plainOptions} value={applyFor} onChange={onChangeApplyFor} />
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllApplyFor} checked={checkAll} style={{ marginTop: '10px' }}>
                    Check all
                </Checkbox>
            </Form.Item>

            <Form.Item
                label="Ghi chú"
            >
                <TextArea rows={3} value={note} onChange={onChangeNote} />
            </Form.Item>

            <Form.Item
                label="Trạng thái"
                className="collection-create-form_last-form-item">
                <Radio.Group onChange={onChangeStatus} value={status}>
                    <Radio value={1}>Hiển thị</Radio>
                    <Radio value={2}>Ẩn</Radio>
                </Radio.Group>
            </Form.Item>

            <Divider />

            <Form.Item className='modal-footer' style={{ marginBottom: '0' }}>
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

export default NBL02