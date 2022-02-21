import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEmployee } from 'actions/module/employee.actions'
import EmployeeService from 'services/api/module/employee.service'
import { Row, Col, Space } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import Breadcrumbs from './Breadcrumbs'
import {
    Form,
    Input,
    Select,
    Button
} from 'antd'

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
            span: 16,
            offset: 2
        }
    }
}

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

class Edit extends Component {
    constructor(props) {
        super(props)

        this.onChangeFullName = this.onChangeFullName.bind(this)
        this.onChangeGender = this.onChangeGender.bind(this)
        this.onChangeStaffCode = this.onChangeStaffCode.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeDepartment = this.onChangeDepartment.bind(this)
        this.onChangePosition = this.onChangePosition.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.cancel = this.cancel.bind(this)

        this.getEmployee = this.getEmployee.bind(this)
        this.updateContent = this.updateContent.bind(this)

        this.state = {
            employeeDetail: {
                _id: null,
                fullName: '',
                gender: 0,
                staffCode: '',
                email: '',
                department: 0,
                position: 0,
                phone: '',
                isLoading: true
            },
            genderSelectedValue: 0,
            deparmentSelectedValue: 0,
            positionSelectedValue: 0,
            title: 'Chỉnh sửa thông tin nhân viên'
        }
    }

    componentDidMount() {
        this.getEmployee(this.props.match.params.id)
        this.setState({ isLoading: false })
    }

    onChangeFullName(e) {
        const fullName = e.target.value

        this.setState(function (prevState) {
            return {
                employeeDetail: {
                    ...prevState.employeeDetail,
                    fullName: fullName
                }
            }
        })
    }

    onChangeEmail(e) {
        const email = e.target.value

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                email: email
            }
        }))
    }

    onChangeStaffCode(e) {
        const staffCode = e.target.value

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                staffCode: staffCode
            }
        }))
    }

    onChangePhone(e) {
        const phone = e.target.value

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                phone: phone
            }
        }))
    }

    onChangeGender(e) {

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                gender: e
            },
            genderSelectedValue: e
        }))
    }

    onChangeDepartment(e) {

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                department: e
            },
            departmentSelectedValue: e
        }))
    }

    onChangePosition(e) {

        this.setState((prevState) => ({
            employeeDetail: {
                ...prevState.employeeDetail,
                position: e
            },
            positionSelectedValue: e
        }))
    }

    cancel() {
        let path = '/employees'
        this.props.history.push(path)
    }

    getEmployee(id) {
        EmployeeService.getById(id)
            .then((response) => {
                this.setState({
                    employeeDetail: response.data,
                    genderSelectedValue: response.data.gender,
                    deparmentSelectedValue: response.data.department,
                    positionSelectedValue: response.data.position
                })
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    updateContent() {
        console.log(this.state.employeeDetail)
        this.props
            .updateEmployee(this.state.employeeDetail._id, this.state.employeeDetail)
            .then((reponse) => {
                console.log(reponse)

                this.setState({ message: 'The Employee was updated successfully!' })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        const {
            employeeDetail,
            genderSelectedValue,
            deparmentSelectedValue,
            positionSelectedValue,
            title
        } = this.state

        return (
            <><Breadcrumbs title={title}/><div>
                {employeeDetail ? (
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
                                        label="Họ và Tên"
                                    >
                                        <Input value={employeeDetail?.fullName} onChange={this.onChangeFullName} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giới tính"
                                    >
                                        <Select
                                            placeholder="Select Option"
                                            value={genderData.find(obj => obj.value === genderSelectedValue)}
                                            options={genderData}
                                            onChange={this.onChangeGender} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Điện thoại"
                                    >
                                        <Input value={employeeDetail?.phone} onChange={this.onChangePhone} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mã nhân viên"
                                    >
                                        <Input value={employeeDetail?.staffCode} onChange={this.onChangeStaffCode} />
                                    </Form.Item>

                                    <Form.Item
                                        label="E-mail"
                                    >
                                        <Input value={employeeDetail?.email} onChange={this.onChangeEmail} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phòng ban"
                                    >
                                        <Select
                                            placeholder="Select Option"
                                            value={departmentData.find(obj => obj.value === deparmentSelectedValue)}
                                            options={departmentData}
                                            onChange={this.onChangeDepartment} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Chức vụ"
                                    >
                                        <Select
                                            placeholder="Select Option"
                                            value={positionData.find(obj => obj.value === positionSelectedValue)}
                                            options={positionData}
                                            onChange={this.onChangePosition} />
                                    </Form.Item>

                                </Col>
                            </Col>
                            <Col span={6}>
                                <Col className='right-sidebar'>
                                    <Form.Item
                                        {...tailFormItemLayout}
                                        label="Publish"
                                        className='widget-title'
                                    >
                                        <Space>
                                            <Button onClick={this.updateContent} type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                                Cập nhật
                                            </Button>
                                            <Button onClick={this.cancel} type="danger" htmlType="submit" icon={<CloseOutlined />}>
                                                Huỷ
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    <div>
                        <br />
                        <p>Not found...</p>
                    </div>
                )}
            </div></>
        )
    }
}

export default connect(null, { updateEmployee })(Edit)