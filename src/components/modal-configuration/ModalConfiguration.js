import React from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

import NBL02 from './ModalForms/NBL02'

const ModalConfiguration = ({ visible, setVisible, title, onCancel, recordInfo, setData, save, cancel }) => {

    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onCancel}
            footer={null}
        >
            <NBL02 recordInfo={recordInfo} setData={setData} save={save} setVisible={setVisible} cancel={cancel} />
        </Modal>
    )
}

export default ModalConfiguration
