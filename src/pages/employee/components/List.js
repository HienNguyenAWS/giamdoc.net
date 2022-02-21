import React, { Component } from 'react'
import { connect } from 'react-redux'
// import toaster from 'components/toaster'
import { retrieveEmployees, deleteEmployee } from 'actions/module/employee.actions'
import { Table, Space, Modal } from 'antd'
import HeaderPage from 'components/header-page/HeaderPage'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { confirm } = Modal

class List extends Component {
    constructor(props) {
        super(props)
        // this.state = { isLoading: true }
        // this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
        this.removeEmployee = this.removeEmployee.bind(this)
    }

    componentDidMount() {
        this.props.retrieveEmployees()
        this.setState ({ isLoading: false })
    }

    removeEmployee(e) {
        const _id = e.currentTarget.dataset.id
        this.props
            .deleteEmployee(_id)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    showDeleteConfirm(e) {
        console.log(e)
        // const _id = e.currentTarget.dataset.id
        confirm({
            title: 'Bạn có muốn xoá nhân viên này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log(this.props)
                // removeEmployee.bind(this)
                // toaster.success('Thanh cong')
                // this.props.history.push('/employees')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    render() {
        const { employees } = this.props
        const columns = [
            {
                title: '',
                dataIndex: 'picture',
                key: 'picture',
                render: text => <a>{text}</a>
            },
            {
                title: 'Mã nhân viên',
                dataIndex: 'staffCode',
                key: 'staffCode'
            },
            {
                title: 'Tên nhân viên',
                dataIndex: 'fullName',
                key: 'fullName'
            },
            {
                title: 'Mail',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Phòng ban',
                dataIndex: 'department',
                key: 'department'
            },
            {
                title: 'Chức vụ',
                dataIndex: 'position',
                key: 'position'
            },
            {
                title: '',
                key: 'action',
                render: (value) => (
                    <Space size="middle">
                        <a ><EyeOutlined /></a>
                        <Link to={'/employees/edit/' + value._id}>
                            <EditOutlined/>
                        </Link>
                        <a data-id={value._id} onClick={this.showDeleteConfirm}><DeleteOutlined /></a>
                    </Space>
                )
            }
        ]

        return (
            <>
                <div className="topnav">
                    <HeaderPage title={'Danh sách nhân viên'} />
                    <div className='bottom'>
                        <Link to={'/employees/create'} className={'add-employee-btn'}>
                            + Thêm mới
                        </Link>
                    </div>
                </div>
                <Table columns={columns} dataSource={employees} /></>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.get('employees')
    }
}

export default connect(mapStateToProps, { retrieveEmployees, deleteEmployee })(List)