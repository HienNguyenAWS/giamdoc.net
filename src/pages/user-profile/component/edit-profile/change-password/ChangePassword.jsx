import { Form, Input } from "antd";
import React from "react";
import "./ChangePassword.scss";
import "../edit-info/EditInfo.scss";
import toaster from "../../../../../components/toaster";
import API from "../../../../../services/api";
import { useHistory } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const ChangePassword = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  // const checkEnableChangeButton = () =>
  //   !form.isFieldsTouched(true) ||
  //   !!form.getFieldsError().filter(({ errors }) => errors.length).length;

  const onResetForm = () => {
    form.resetFields();
    history.push('/profile');
  };

  const onSubmit = async () => {
    try {
      const result = await API.user.resetUserPassword({
        NewPass: form.getFieldValue("newPassword"),
        OldPass: form.getFieldValue("oldPassword"),
      });
      if (result?.code === 200) {
        toaster.success("Đổi mật khẩu thành công");
        onResetForm();
      } else {
        toaster.error("Mật khẩu cũ không đúng");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="form-wrapper change-password-form">
      <h4>Thay đổi mật khẩu</h4>
      <p>Thay đổi mật khẩu để tăng bảo mật cho tài khoản</p>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="control-hooks"
        initialValues={{}}
        className="change-password-form"
        onFinish={onSubmit}
      >
        <Form.Item
          // label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Xin nhâp mật khẩu cũ!" }]}
          
        >
          <Input.Password 
          style={{paddingTop:28}}
          prefix='Mật khẩu cũ: '
          //  placeholder="Nhập mật khẩu cũ" 
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          // label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Xin nhâp mật khẩu mới!" }]}
        >
                    <Input.Password 
          prefix='Mật khẩu mới: '
          //  placeholder="Nhập mật khẩu cũ" 
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          // label="Nhập lại mật khẩu mới"
          name="confirmNewPassword"
          rules={[
            { required: true, message: "Xin nhâp mật lại khẩu cũ!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu không tương tự!")
                );
              },
            }),
          ]}
        >
                    <Input.Password 
          prefix='Nhập lại mật khẩu mới: '
          //  placeholder="Nhập mật khẩu cũ" 
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <div className="footer-end" >
          <button
            type="button"
            onClick={onResetForm}
            className="button reset-button"
          >
            Huỷ
          </button>
          <button type="submit" className={`button submit-button`}>
            Đổi
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
