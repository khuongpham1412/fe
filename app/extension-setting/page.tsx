"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Switch } from "antd";
import React, { useState } from "react";

const Setting = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  let data = [{ url: "github.com" }, { url: "google.com" }];

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const onFinish = (values: any) => {};

  const handleChangePassword = () => {
    setModalOpen(false);
  };

  const updateDomain = (value: string) => {
    console.log(value);
  };

  const addNewDomain = () => {};

  const deleteDomain = (domain: string) => {};

  return (
    <div className="flex flex-col h-[100vh] p-10 gap-5 m-auto">
      <div className="text-2xl text-gray-600">Common</div>
      <Divider className="-my-2"></Divider>
      <div className="flex justify-between items-center w-[600px]">
        <div className="text-xl text-black">Enable extensions</div>
        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="text-xl text-black">Excluded domain</div>
      <div className="flex justify-between items-center w-[600px] gap-2">
        <Input
          type="text"
          className="w-full"
          placeholder="Example: github.com, google.com, youtube.com,..."
        ></Input>
        <Button type="primary" onClick={addNewDomain}>
          +
        </Button>
      </div>
      {data.map((item) => (
        <div
          className="flex justify-between items-center w-[600px] gap-2"
          key={item.url}
        >
          <Input
            type="text"
            className="w-full"
            defaultValue={item.url}
            onBlur={(e) => updateDomain(e.target.value)}
            placeholder="Example: github.com, google.com, youtube.com,..."
          />
          <Button
            type="dashed"
            danger
            className="w-[7%]"
            onClick={() => deleteDomain(item.url)}
          >
            x
          </Button>
        </div>
      ))}
      <div className="text-2xl text-gray-600 mt-10">Account</div>
      <Divider className="-my-2"></Divider>
      <div className="flex justify-between items-center w-[600px]">
        <div className="text-xl text-black">Username</div>
        <div className="text-lg text-black">khuong12345</div>
      </div>
      <div className="flex justify-between items-center w-[600px]">
        <div className="text-xl text-black">E-mail</div>
        <div className="text-lg text-black">khuong@gmail.com</div>
      </div>
      <div className="flex justify-between items-center w-[600px]">
        <div className="text-xl text-black">Password</div>
        <Button type="primary" onClick={handleOpen}>
          Change password
        </Button>
      </div>

      <Modal
        title="Change password"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleChangePassword}
        width={350}
      >
        <Form name="change_password" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="old_password"
            label="Old password"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Old password"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="New password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="New password"
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
        </Form>
      </Modal>
    </div>
  );
};

export default Setting;
