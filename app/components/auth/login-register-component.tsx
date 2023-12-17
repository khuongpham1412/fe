import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  MehOutlined,
  SmileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Tabs } from "antd";
import type { TabsProps } from "antd";

const LoginRegisterComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidForm, setFormValid] = useState<boolean>();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    loginForm.resetFields();
    registerForm.resetFields();
  };

  const onLoginFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
  };

  const loginWithGoogle = () => {
    console.log("log in with google");
  };

  const onRegisterFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
  };

  const onLoginValueChange = async () => {
    try {
      await loginForm.validateFields();
      setFormValid(true);
    } catch (e) {
      setFormValid(false);
    }
  };

  const onRegisterValueChange = async () => {
    try {
      await registerForm.validateFields();
      setFormValid(true);
    } catch (e) {
      setFormValid(false);
    }
  };

  const onTabChange = () => {
    setFormValid(false);
    loginForm.resetFields();
    registerForm.resetFields();
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Login",
      children: (
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onLoginFinish}
          form={loginForm}
          onChange={onLoginValueChange}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a>Forgot password</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log in
            </Button>
            <div className="text-center my-3">Or</div>
            <Button className="w-full" onClick={loginWithGoogle}>
              <Space>
                <GoogleOutlined />
                Login with Google
              </Space>
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Sign Up",
      children: (
        <Form
          name="signup_form"
          initialValues={{ remember: true }}
          onFinish={onRegisterFinish}
          form={registerForm}
          onChange={onRegisterValueChange}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-3">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <>
      <div
        className=" text-white text-lg font-semibold text-center my-6 cursor-pointer hover:text-blue-500"
        onClick={showModal}
      >
        Login/Signup
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        width={350}
      >
        <div className="text-center text-[100px] -mb-5 -mt-8">
          {
            isValidForm ? (
              <SmileOutlined /> //Dung thi hien thi icon nay
            ) : (
              <MehOutlined />
            ) //Sai thi hien thi icon nay
          }
        </div>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onTabClick={onTabChange}
          centered
        />
      </Modal>
    </>
  );
};

export default LoginRegisterComponent;
