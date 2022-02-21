import React from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

import NBL03 from './ModalForms/NBL03'

const ModalConfiguration3 = ({ visible, setVisible, title, onCancel, recordInfo, setData, save, cancel }) => {
    return (
        <Modal visible={true} title={title} onCancel={onCancel} footer={null}>
            <NBL03 recordInfo={recordInfo} setData={setData} save={save} setVisible={setVisible} cancel={cancel} />
        </Modal>
    )
}

export default ModalConfiguration3
