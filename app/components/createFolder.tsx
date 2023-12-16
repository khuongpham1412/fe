import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import TreeFolder from "./treeFolder";
type Props = {
  title: string;
  key: string;
  children?: [];
};

const CreateFolder = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataFolder, setDataFolder] = useState<any[]>([]);
  const onFinish = (values: any) => {
    if (dataFolder.some((item) => item.key === values.name)) {
      messageApi.open({
        type: "error",
        content: "Trùng tên",
      });
    } else {
      const newData = {
        title: values.name,
        key: values.name,
      };
      setDataFolder((prevData: any) => [...prevData, newData]);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form name="basic" onFinish={onFinish} className="flex">
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="name" maxLength={10} />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
            icon={<FolderAddOutlined />}
            htmlType="submit"
          ></Button>
        </Form.Item>
      </Form>

      <TreeFolder data={dataFolder} />
    </div>
  );
};

export default CreateFolder;
