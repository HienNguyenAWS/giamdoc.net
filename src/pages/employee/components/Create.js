import React, { Component } from 'react'
import { connect } from 'react-redux'
import toaster from 'components/toaster'
import { createEmployee } from 'actions/module/employee.actions'
import 'antd/dist/antd.css'
import { Row, Col, Space } from 'antd'
import Breadcrumbs from './Breadcrumbs'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import Avatar from 'react-avatar-edit'
import {
    Form,
    Input,
    Select,
    Button
} from 'antd'

const genderData = [
    {
        value: 1,
        label: 'Nam'
    },
    {
        value: 2,
        label: 'Nữ'
    },
    {
        value: 3,
        label: 'Khác'
    }
]

const departmentData = [
    {
        value: 1,
        label: 'Hành chính'
    },
    {
        value: 2,
        label: 'Nhân sự'
    },
    {
        value: 3,
        label: 'Kế toán'
    }
]

const positionData = [
    {
        value: 1,
        label: 'Trưởng phòng'
    },
    {
        value: 2,
        label: 'Phó phòng'
    },
    {
        value: 3,
        label: 'Quản lý'
    }
]

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 24,
            offset: 2
        }
    }
}

class Create extends Component {
    constructor(props) {
        super(props)

        const src = 'https://dummyimage.com/600x400/000/fff'

        this.onChangeFullName = this.onChangeFullName.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this)
        this.onChangeStartDayWorking = this.onChangeStartDayWorking.bind(this)
        this.onChangeStaffCode = this.onChangeStaffCode.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeDepartment = this.onChangeDepartment.bind(this)
        this.onChangePosition = this.onChangePosition.bind(this)
        this.onChangePhone = this.onChangePosition.bind(this)
        this.cancel = this.cancel.bind(this)

        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)

        this.saveEmployee = this.saveEmployee.bind(this)

        this.state = {
            id: null,
            fullName: '',
            gender: 1,
            dayofbirth: null,
            startDayWorking: null,
            staffCode: '',
            email: '',
            department: 1,
            position: 1,
            phone: '',
            submitted: false,
            preview: null,
            src,
            title: 'Thêm nhân viên mới'
        }
    }

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 91680) {
            alert('File is too big!')
            elem.target.value = ''
        }
    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value
        })
    }

    onChangeGender(value) {
        this.setState({
            gender: value
        })
    }

    onChangeDateOfBirth(e) {
        this.setState({
            dayofbirth: e.target.value
        })
    }

    onChangeStartDayWorking(e) {
        this.setState({
            startDayWorking: e.target.value
        })
    }

    onChangeStaffCode(e) {
        this.setState({
            staffCode: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeDepartment(value) {
        this.setState({
            department: value
        })
    }

    onChangePosition(value) {
        this.setState({
            position: value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    saveEmployee() {
        const {
            fullName,
            gender,
            dayofbirth,
            startDayWorking,
            staffCode,
            email,
            department,
            position,
            phone
        } = this.state

        this.props
            .createEmployee(fullName, gender, dayofbirth, startDayWorking, staffCode, email, department, position, phone)
            .then((data) => {
                console.log(data._id)
                if (data?._id > 0) {
                    toaster.success('Thanh cong')
                    this.props.history.push('/employees')
                } else {
                    toaster.error('Failed')
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    cancel() {
        let path = '/employees'
        this.props.history.push(path)
    }

    render() {
        const { title } = this.state

        return (
            <><Breadcrumbs title={title} />
                <Form
                    {...formItemLayout}
                    layout="vertical"
                    name="employee-register-form"
                    scrollToFirstError
                >
                    <Row>
                        <Col span={18}>
                            <Col className='main-form'>
                                <Form.Item
                                    name="fullName"
                                    label="Họ và Tên"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Không được để trống!'
                                    //     }
                                    // ]}
                                >
                                    <Input placeholder='Nguyen Van A' onChange={this.onChangeFullName} />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                    // rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                >
                                    <Select
                                        placeholder="Select Option"
                                        options={genderData}
                                        onChange={this.onChangeGender}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Điện thoại"
                                    // rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input placeholder='1234567890' onChange={this.onChangePhone} />
                                </Form.Item>

                                <Form.Item
                                    name="staffCode"
                                    label="Mã nhân viên"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Không được để trống!'
                                    //     }
                                    // ]}
                                >
                                    <Input placeholder='SD001' onChange={this.onChangeStaffCode} />
                                </Form.Item>

                                <Form.Item
                                    name="department"
                                    label="Phòng ban"
                                    // rules={[{ required: true, message: 'Chọn phòng ban!' }]}
                                >
                                    <Select
                                        placeholder="Select Option"
                                        options={departmentData}
                                        onChange={this.onChangeDepartment}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="position"
                                    label="Chức vụ"
                                    // rules={[{ required: true, message: 'Chọn chức vụ!' }]}
                                >
                                    <Select
                                        placeholder="Select Option"
                                        options={positionData}
                                        onChange={this.onChangePosition}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                        <Col span={6}>
                            <Col className='right-sidebar'>
                                <Form.Item
                                    {...tailFormItemLayout}
                                    label="Avatar"
                                    className='widget-title'
                                >
                                    <div>
                                        <Avatar
                                            width={300}
                                            height={230}
                                            onCrop={this.onCrop}
                                            onClose={this.onClose}
                                            onBeforeFileLoad={this.onBeforeFileLoad}
                                            src={this.state.src}
                                        />
                                        {/* <img src={this.state.preview} alt="Preview" /> */}
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col className='right-sidebar'>
                                <Form.Item
                                    {...tailFormItemLayout}
                                    label="Publish"
                                    className='widget-title'
                                >
                                    <Space>
                                        <Button onClick={this.saveEmployee} type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                        Thêm mới
                                        </Button>
                                        <Button onClick={this.cancel} type="danger" htmlType="submit" icon={<CloseOutlined />}>
                                        Huỷ
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                </Form></>
        )
    }
}

export default connect(null, { createEmployee })(Create)