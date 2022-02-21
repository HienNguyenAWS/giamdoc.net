import React from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

import NBL02 from './ModalForms/NBL02'

const ModalConfiguration = ({ visible, title, onCancel, recordInfo, setData }) => {

    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onCancel}
            footer={null}
        >
            <NBL02 recordInfo={recordInfo} setData={setData} />
        </Modal>
    )
}

export default ModalConfiguration
