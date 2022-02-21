/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './EditDescription.scss';
import '../edit-info/EditInfo.scss';
import { Col, Row, Form, Input, DatePicker, Alert,Tooltip } from "antd";
import workIcon from '../../../../../assets/images/work-icon.svg';
import homeIcon from '../../../../../assets/images/home-icon.svg';
import location2Icon from '../../../../../assets/images/location2-icon.svg';
import messageIcon from '../../../../../assets/images/message-icon.svg';
import addIcon from '../../../../../assets/images/add-icon.svg';
import editIcon from '../../../../../assets/images/edit-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../UserProfile.action';
import { useHistory } from 'react-router';
import { validateEmail } from '../../../../../utils';
import { message as messageNoti } from "antd";

const EditDescription = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector(state => state.get('userProfile').get('profile'));
  const [showEdit, setShowEdit] = useState({ job: false, address: false, homeAddress: false, email: false });
  const [initialValue, setInitialValue] = useState({
    job: userInfo.JobTitle,
    address: userInfo.Address,
    homeAddress: userInfo.Address,
    email: userInfo.Email,
    department:userInfo.Department||""
  });
  const [emailTypeError, setEmailTypeError] = useState(false);
  const [isAddMoreJob, setIsAddMoreJob] = useState(false);
  const [form] = Form.useForm();

  const handleShowEdit = (type, data) => {
    showEdit[type] = data;
    const newShowEdit = JSON.parse(JSON.stringify(showEdit));
    setShowEdit(newShowEdit);
  };

  const handleInputChange = (value, type) => {
    initialValue[type] = value;
    setInitialValue(JSON.parse(JSON.stringify(initialValue)));
  };

  const onEnter = (event, type) => {
    ;
    if (event.key === "Enter") {
      handleShowEdit(type, false);
    }
  };

  const onSubmit = () => {
    console.log('form.getFieldsValue()', form.getFieldsValue())
    // return
    if (!validateEmail(form.getFieldsValue().email)) {
      // setEmailTypeError(true);
      messageNoti.error('Email không hợp lệ')
      return;
    }
    dispatch(updateProfile(form.getFieldsValue()));
    history.push('/profile');
  };

  const onResetForm = () => {
    setInitialValue({
      job: userInfo.JobTitle,
      address: userInfo.Address,
      homeAddress: userInfo.Address,
      email: userInfo.Email
    });
    setShowEdit({ job: false, address: false, homeAddress: false, email: false });
  };

  return <div
    className="form-wrapper"
  >
    <h4>Chỉnh sửa giới thiệu</h4>
    <p>Những chi tiết bạn chọn sẽ hiển thị công khai nhưng không xuất hiện trên Bảng tin</p>
    <div className="info-list">
    <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        name="control-hooks"
        initialValues={initialValue}
      >
        <Form.Item label="Công việc" name="job">
          <Input />
        </Form.Item>
        <Form.Item label="Nơi sống" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Chức vụ" name="department">
          <Input />
        </Form.Item>
        <div className="footer-end" >
        <button
            type="button"
            onClick={onResetForm}
            className="button reset-button"
          >
            Huỷ
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="button submit-button"
          >
            Lưu
          </button>
        </div>
      </Form>
      </div>
      </div>
};

export default EditDescription;