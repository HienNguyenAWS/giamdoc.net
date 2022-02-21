/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable semi */
import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { Editor } from '@tinymce/tinymce-react'
import './index.scss'
import { Stepper } from './stepper'

const CreateTemplateModal = ({ isShowing, hide: _hide }) => {
    const [isCreateStep, setIsCreateStep] = useState(true)

    const hide = useCallback(() => {
        _hide()
        setIsCreateStep(true)
    }, [_hide])
    return isShowing
        ? ReactDOM.createPortal(
            <>
                <div className="modal-overlay" />
                <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                    <div className="modal">
                        {isCreateStep ? (
                            <>
                                <div className="modal-header">
                                    <div className="title">Tạo bộ template</div>
                                    <button type="button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-input-field">
                                        <label>Tên</label>
                                        <input type="input" />
                                    </div>
                                    <div className="modal-input-field">
                                        <label>Mã</label>
                                        <input type="input" />
                                    </div>
                                    <Editor
                                        tinymceScriptSrc="/js/tinymce/tinymce.min.js"
                                        init={{
                                            width: '100%',
                                            height: 200,
                                            menubar: false,
                                            plugins: ['lists'],
                                            toolbar:
													'fontselect fontsizeselect forecolor | bold italic underline | numlist bullist | undo redo',
                                            toolbar_mode: 'sliding'
                                        }}
                                    />
                                    <div style={{ height: '10px' }} />
                                    <div className="modal-input-select-field">
                                        <label>Chọn Business Category:</label>
                                        <select>
                                            <option value="" disabled selected>
													Chọn loại business category
                                            </option>
                                        </select>
                                    </div>
                                    <div className="modal-input-select-field">
                                        <label>Chọn Nhóm Tenant :</label>
                                        <select>
                                            <option value="" disabled selected>
													Chọn Nhóm Tenant
                                            </option>
                                        </select>
                                    </div>
                                    <div className="modal-input-select-field">
                                        <label>Chọn Tenant:</label>
                                        <select>
                                            <option value="" disabled selected>
													Chọn Tenant
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-action" style={{ justifyContent: 'center' }}>
                                    <button type="button" onClick={() => setIsCreateStep(false)}>
											Tạo Template
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Stepper onCloseModal={hide} />
                        )}
                    </div>
                </div>
            </>,
            document.body
		  )
        : null
};

export default CreateTemplateModal
