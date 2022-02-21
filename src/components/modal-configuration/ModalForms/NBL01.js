import React, { useEffect, useRef, useState } from 'react'
import { Checkbox, Divider, Form, Input, Radio, Button } from 'antd'
import clsx from 'clsx'
import { C } from 'styled-icons/simple-icons'
import { data } from 'pages/pay-grades/initialize-data/_mock01'
import { applyForData as _applyForData  } from 'pages/pay-grades/initialize-data/_masterData'
const CheckboxGroup = Checkbox.Group

const plainOptions = ['Giám đốc', 'Trợ lý giám đốc', 'Quản lý điều hành', 'Nhân viên']
const defaultCheckedList = ['Giám đốc']

const NBL01 = ({ recordInfo, setData, save, setVisible, cancel, luongKhoiDiem, setLuongKhoiDiem, initialSalary, setInitialSalary, applyForData }) => {
    const [initialSalary1, setInitialSalary1] = useState(initialSalary[0].value)
    const [initialSalary2, setInitialSalary2] = useState(initialSalary[1].value)
    const [coefficient, setCoefficient] = useState(recordInfo.heSo[0])
    const [jump, setCoefficientJump] = useState(recordInfo.heSo[1])
    const [coefficientFlg, setCoefficientFlg] = useState(1)
    const [lcb, setLcb] = useState(70)
    const [kpi, setKpi] = useState(30)
    const [allowance, setAllowance] = useState(40)
    const [applyFor, setApplyFor] = useState(defaultCheckedList)
    const [note, setNote] = useState('Note')
    const [status, setStatus] = useState(1)
    const [indeterminate, setIndeterminate] = React.useState(true)
    const [checkAll, setCheckAll] = React.useState(false)

    const [form] = Form.useForm()
    const { TextArea } = Input
    const inputCoefficientErrorRef = useRef(null)
    const inputJumpErrorRef = useRef(null)
    const errorCoefficientRef = useRef(null)
    const errorJumpRef = useRef(null)

    const onChangeSalary1 = (e) => {
        setInitialSalary1( e.target.value)
    }

    const onChangeSalary2 = (e) => {
        setInitialSalary2(e.target.value)
    }

    const onChangeCoefficient = (e) => {
        setCoefficient(e.target.value)
    }

    useEffect(() => {
        const lenChild = recordInfo.children.length - 1
        if (coefficientFlg == 1) {
            const childCenter = parseInt(lenChild / 2)
            const b1 = coefficient - childCenter * jump
            if (b1 <= 0) {
                errorCoefficientRef.current.classList.remove('d-none')
                inputCoefficientErrorRef.current.classList.add('input__error')
            } else {
                errorCoefficientRef.current.classList.add('d-none')
                inputCoefficientErrorRef.current.classList.remove('input__error')
            }
        }
        else {
            if (coefficient <= 0) {
                errorCoefficientRef.current.classList.remove('d-none')
                inputCoefficientErrorRef.current.classList.add('input__error')
            } else {
                errorCoefficientRef.current.classList.add('d-none')
                inputCoefficientErrorRef.current.classList.remove('input__error')
            }
        }
    }, [coefficient, coefficientFlg])

    const onChangeJump = (e) => {
        setCoefficientJump(e.target.value)
    }

    useEffect(() => {
        const lenChild = recordInfo.children.length - 1
        if (coefficientFlg == 1) {
            const childCenter = parseInt(lenChild / 2)
            const b1 = coefficient - childCenter * jump
            if (b1 <= 0) {
                errorJumpRef.current.classList.remove('d-none')
                inputJumpErrorRef.current.classList.add('input__error')
            } else {
                errorJumpRef.current.classList.add('d-none')
                inputJumpErrorRef.current.classList.remove('input__error')
            }
        }
        else {
            if (jump <= 0) {
                errorCoefficientRef.current.classList.remove('d-none')
                inputCoefficientErrorRef.current.classList.add('input__error')
            } else {
                errorCoefficientRef.current.classList.add('d-none')
                inputCoefficientErrorRef.current.classList.remove('input__error')
            }
        }
    }, [jump, coefficientFlg])

    const onChangeCoefficientFlg = (e) => {
        setCoefficientFlg(e.target.value)
    }

    const onChangeLcb = (e) => {
        setLcb(e.target.value)
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

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const onChangeApplyFor = (list) => {
        setApplyFor(list)
        setIndeterminate(!!list.length && list.length < applyForData.length)
        setCheckAll(list.length === applyForData.length)
    }

    const onCheckAllApplyFor = (e) => {
        setApplyFor(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
    }

    const onFinish = () => {
        console.log(recordInfo)
        setData(`${recordInfo.key}.heSo`, [coefficient, jump])
        setData(`${recordInfo.key}.loaiHeSo`, coefficientFlg)
        setData(`${recordInfo.key}.lcbDefault`, lcb)
        setData(`${recordInfo.key}.kpiDefault`, kpi)
        setData(`${recordInfo.key}.phuCapDefault`, allowance)
        // setData(`${recordInfo.key}.ghiChu`, note)
        setInitialSalary([{
            value: initialSalary1
        },
        {
            value: initialSalary2
        }])
        setLuongKhoiDiem(initialSalary1)
        save
        setVisible(false)
    }

    const onFinishFailed = () => {

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
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 20px)' }}>
                    <div ref={inputCoefficientErrorRef} className='input__normal'>
                        <Input
                            className="input--hideArrow border-0"
                            type={'number'}
                            onChange={onChangeCoefficient}
                            value={coefficient}
                        />
                    </div>
                    <div ref={errorCoefficientRef} className="d-none color-red font-size-12px">
                        Sai giá trị
                    </div>
                </Form.Item>
                <Form.Item style={{ display: 'inline-block', width: '50%', margin: '0 8px' }}>
                    <div ref={inputJumpErrorRef} className='input__normal'>
                        <Input
                            className="input--hideArrow border-0"
                            type={'number'}
                            onChange={onChangeJump}
                            value={jump}
                        />
                    </div>
                    <div ref={errorJumpRef} className="d-none color-red font-size-12px">
                        Sai giá trị
                    </div>
                </Form.Item>
            </Form.Item>

            <Form.Item label="Set giá trị hệ số" className="collection-create-form_last-form-item">
                <Radio.Group onChange={onChangeCoefficientFlg} value={coefficientFlg}>
                    <Radio value={1}>Trung tâm</Radio>
                    <Radio value={2}>Khởi điểm</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Lương LCB (%)">
                <Input value={lcb} onChange={onChangeLcb} />
            </Form.Item>

            <Form.Item label="Lương KPI (%)">
                <Input value={kpi} onChange={onChangeKpi} />
            </Form.Item>

            <Form.Item label="Lương phụ cấp (%)">
                <Input value={allowance} onChange={onChangeAllowance} />
            </Form.Item>

            {/* <Form.Item label="Áp dụng cho">
                {_applyForData.map((data) => {
                    return (
                        <Checkbox key={data.id} value={data.id} onChange={onChangeApplyFor}>{data.data}</Checkbox>
                    )
                })}
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllApplyFor}
                    checked={checkAll}
                    style={{ marginTop: '10px' }}
                >
                    Check all
                </Checkbox>
            </Form.Item> */}

            {/* <Form.Item label="Ghi chú">
                <TextArea rows={3} value={note} onChange={onChangeNote} />
            </Form.Item> */}

            <Form.Item label="Trạng thái" className="collection-create-form_last-form-item">
                <Radio.Group onChange={onChangeStatus} value={status}>
                    <Radio value={1}>Hiển thị</Radio>
                    <Radio value={2}>Ẩn</Radio>
                </Radio.Group>
            </Form.Item>

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

export default NBL01
