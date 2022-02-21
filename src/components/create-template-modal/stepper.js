import clsx from 'clsx'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Eye from 'assets/images/eye.svg'
import More from 'assets/images/more.svg'
import { Row, Col, Card } from 'antd'

const steps = ['Ngạch bậc lương', 'Cơ chế', 'Ma trận bố trí nhân sự', 'Bảng tính lương', 'Chi phí nhân sự']

const Step1 = () => {
    return (
        <>
            <div className="modal-body__title">Step 1: Chọn Ngạch Bậc Lương</div>
            <Row justify="space-around" gutter={16}>
                {[1, 2, 3].map((e) => (
                    <Col flex="0 1 auto" key={e} span={8}>
                        <Card
                            className="modal-body__card"
                            cover={
                                <div>
                                    <img alt="example" src="mock_image.png" />
                                    <button className="modal-body__card__extra">
                                        <img alt="more" src={ More } />
                                    </button>
                                </div>
                            }
                            bodyStyle={{ padding: '10px 5px' }}
                            hoverable
                        >
                            <div className="modal-body__card__title">Ngach bac luong {e}</div>
                            <div className="modal-body__card__action">
                                <a href={'/pay-grades/' + e} target="_blank" rel="noreferrer">
                                    <button>
                                        <img src={Eye} style={{ marginRight: 2 }} />
									    Xem trước
                                    </button>
                                </a>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

const Step2 = () => {
    return (
        <>
            <div className="modal-body__title">Step 2: Chọn Cơ chế</div>
            <Row justify="space-around" gutter={16}>
                {[1, 2, 3].map((e) => (
                    <Col flex="0 1 auto" key={e} span={8}>
                        <Card
                            className="modal-body__card"
                            cover={
                                <div>
                                    <img alt="example" src="mock_image.png" />
                                    <button className="modal-body__card__extra">
                                        <img alt="more" src={More} />
                                    </button>
                                </div>
                            }
                            bodyStyle={{ padding: '10px 5px' }}
                            hoverable
                        >
                            <div className="modal-body__card__title">Cơ chế {e}</div>
                            <div className="modal-body__card__action">
                                <button>
                                    <img src={Eye} style={{ marginRight: 2 }} />
									Xem trước
                                </button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

const Step3 = ({ onClickPass }) => {
    return (
        <>
            <div className="modal-body__title">
				Step 3: Chọn Ma trận bố trí nhân sự
                <div className="modal-body__title__extra" onClick={onClickPass}>
					Bỏ qua
                </div>
            </div>
            <Row justify="space-around" gutter={16}>
                {[1, 2, 3].map((e) => (
                    <Col flex="0 1 auto" key={e} span={8}>
                        <Card
                            className="modal-body__card"
                            cover={
                                <div>
                                    <img alt="example" src="mock_image.png" />
                                    <button className="modal-body__card__extra">
                                        <img alt="more" src={More} />
                                    </button>
                                </div>
                            }
                            bodyStyle={{ padding: '10px 5px' }}
                            hoverable
                        >
                            <div className="modal-body__card__title">Ma trận {e}</div>
                            <div className="modal-body__card__action">
                                <button>
                                    <img src={Eye} style={{ marginRight: 2 }} />
									Xem trước
                                </button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

Step3.propTypes = {
    onClickPass: PropTypes.func.isRequired
}

const Step4 = () => {
    return (
        <>
            <div className="modal-body__title">Step 4: Chọn Lương (Tính Lương)</div>
            <Row justify="space-around" gutter={16}>
                {[1, 2, 3].map((e) => (
                    <Col flex="0 1 auto" key={e} span={8}>
                        <Card
                            className="modal-body__card"
                            cover={
                                <div>
                                    <img alt="example" src="mock_image.png" />
                                    <button className="modal-body__card__extra">
                                        <img alt="more" src={More} />
                                    </button>
                                </div>
                            }
                            bodyStyle={{ padding: '10px 5px' }}
                            hoverable
                        >
                            <div className="modal-body__card__title">Tính lương {e}</div>
                            <div className="modal-body__card__action">
                                <button>
                                    <img src={Eye} style={{ marginRight: 2 }} />
									Xem trước
                                </button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

const Step5 = ({ onClickPass }) => {
    return (
        <>
            <div className="modal-body__title">
				Step 5: Chi Phí Nhân Sự
                <div className="modal-body__title__extra" onClick={onClickPass}>
					Bỏ qua
                </div>
            </div>
            <Row justify="space-around" gutter={16}>
                {[1, 2, 3].map((e) => (
                    <Col flex="0 1 auto" key={e} span={8}>
                        <Card
                            className="modal-body__card"
                            cover={
                                <div>
                                    <img alt="example" src="mock_image.png" />
                                    <button className="modal-body__card__extra">
                                        <img alt="more" src={More} />
                                    </button>
                                </div>
                            }
                            bodyStyle={{ padding: '10px 5px' }}
                            hoverable
                        >
                            <div className="modal-body__card__title">Chi Phí Nhân Sự {e}</div>
                            <div className="modal-body__card__action">
                                <button>
                                    <img src={Eye} style={{ marginRight: 2 }} />
									Xem trước
                                </button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

Step5.propTypes = {
    onClickPass: PropTypes.func.isRequired
}

const Done = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
            <div className="modal-body__button-title">Chỉnh sửa template vừa tạo?</div>
        </div>
    )
}

export const Stepper = ({ onCloseModal }) => {
    const [activeStep, setActiveStep] = useState(0)
    return (
        <>
            <div className="modal-header" style={{ paddingBottom: '8px' }}>
                <div style={{ mb: 3 }}>
                    <ul className="progressbar">
                        {steps.map((label, index) => (
                            <li
                                key={label}
                                className={clsx({
                                    complete: activeStep > index,
                                    active: activeStep === index
                                })}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="button" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>
                    <span aria-hidden="true" style={{ fontSize: '30px', marginTop: '8px' }}>
						&times;
                    </span>
                </button>
            </div>
            <div className="modal-body">
                {activeStep === 0 && <Step1 />}
                {activeStep === 1 && <Step2 />}
                {activeStep === 2 && <Step3 onClickPass={() => setActiveStep(activeStep + 1)} />}
                {activeStep === 3 && <Step4 />}
                {activeStep === 4 && <Step5 onClickPass={() => setActiveStep(activeStep + 1)} />}
                {activeStep === 5 && <Done />}
            </div>
            <div className="modal-action">
                {activeStep < steps.length ? (
                    <>
                        <button
                            type="button"
                            className="modal-action__back-button"
                            onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                            style={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
                        >
							Step {activeStep}
                        </button>
                        <button type="button" onClick={() => setActiveStep(activeStep + 1)}>
							Lưu &amp; Step {activeStep + 2}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            style={{
                                width: '140px',
                                background: '#2FCE00',
                                marginLeft: 40
                            }}
                            onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                        >
							Trở về
                        </button>
                        <button style={{ width: '140px', marginRight: 40 }}>Tiếp tục</button>
                    </>
                )}
            </div>
        </>
    )
}

Stepper.propTypes = {
    onCloseModal: PropTypes.func.isRequired
}
