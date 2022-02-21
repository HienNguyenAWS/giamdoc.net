import React from 'react'
import { Form, Input, Radio } from 'antd'

const NBL01 = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Title">
                <Input />
            </Form.Item>
            <Form.Item label="Description">
                <Input type="textarea" />
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
                <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default NBL01