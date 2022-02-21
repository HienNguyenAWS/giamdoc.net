import React from 'react'
import { Modal } from 'antd'
import 'antd/dist/antd.css'

import NBL02 from './ModalForms/NBL02'

const ModalConfiguration = ({ visible, setVisible, title, onCancel, recordInfo, setData, save, cancel,
    luongKhoiDiem, setLuongKhoiDiem, initialSalary, setInitialSalary, applyForData }) => {

    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onCancel}
            footer={null}
        >
            <NBL02 recordInfo={recordInfo} setData={setData} save={save} setVisible={setVisible} cancel={cancel}
                luongKhoiDiem={luongKhoiDiem}
                setLuongKhoiDiem={setLuongKhoiDiem}
                initialSalary={initialSalary}
                setInitialSalary={setInitialSalary}
                applyForData={applyForData} />
        </Modal>
    )
}

export default ModalConfiguration
