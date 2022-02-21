import React from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

import NBL01 from './ModalForms/NBL01'

const ModalConfiguration = ({ visible, onCancel, onCreate, title }) => {

    return (
        <Modal
            visible={visible}
            title={title}
            okText="Submit"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <NBL01 />
        </Modal>
    )
}

export default ModalConfiguration
