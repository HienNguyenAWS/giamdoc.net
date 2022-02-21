import React, { useState } from 'react'
import { Checkbox, Divider, Form, Input, Radio, Button } from 'antd'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Giám đốc', 'Trợ lý giám đốc', 'Quản lý điều hành', 'Nhân viên']
const defaultCheckedList = ['Giám đốc']

const NBL02 = ( { recordInfo, setData, save, setVisible, cancel, setLuongKhoiDiem, initialSalary, setInitialSalary }) => {
    const [initialSalary1, setInitialSalary1] = useState(initialSalary[0].value)
    const [initialSalary2, setInitialSalary2] = useState(initialSalary[1].value)
    const [coefficient, setCoefficient] = useState(recordInfo.coefficient[0])
    const [jump, setCoefficientJump] = useState(recordInfo.coefficient[1])
    const [coefficientFlg, setCoefficientFlg] = useState(1)
    const [kpi, setKpi] = useState(30)
    const [allowance, setAllowance] = useState(40)
    const [applyFor, setApplyFor] = useState(defaultCheckedList)
    const [note, setNote] = useState('Note')
    const [status, setStatus] = useState(1)
    const [indeterminate, setIndeterminate] = React.useState(true)
    const [checkAll, setCheckAll] = React.useState(false)

    const [form] = Form.useForm()
    const { TextArea } = Input

    const onChangeSalary1 = (e) => {
        setInitialSalary1( e.target.value)
    }

    const onChangeSalary2 = (e) => {
        setInitialSalary2(e.target.value)
    }

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


    const onFinish = (values) => {
        setData(`${recordInfo.key - 1}.coefficient`, [coefficient, jump])
        setData(`${recordInfo.key - 1}.coefficientFlg`, coefficientFlg)
        setData(`${recordInfo.key - 1}.kpiDefault`, kpi)
        setData(`${recordInfo.key - 1}.allowanceDefault`, allowance)
        setInitialSalary([{
            value: initialSalary1
        },
        {
            value: initialSalary2
        }])
        setLuongKhoiDiem(initialSalary1)
        save
        setVisible(false)
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const onClose = () => {
        cancel
        setVisible(false)
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
            <Form.Item label="Lương khởi điểm" style={{ marginBottom: 0 }}>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 20px)' }}>
                    <div className='input__normal'>
                        <Input
                            className="input--hideArrow border-0"
                            type={'number'}
                            onChange={onChangeSalary1}
                            value={initialSalary1}
                        />
                    </div>
                    <div className="d-none color-red font-size-12px">
                        Sai giá trị
                    </div>
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: '50%', margin: '0 8px' }}>
                    <div className='input__normal'>
                        <Input
                            className="input--hideArrow border-0"
                            type={'number'}
                            onChange={onChangeSalary2}
                            value={initialSalary2}
                        />
                    </div>
                    <div className="d-none color-red font-size-12px">
                        Sai giá trị
                    </div>
                </Form.Item>
            </Form.Item>

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