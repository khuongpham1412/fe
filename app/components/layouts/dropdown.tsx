import React from "react";
import {
  MoreOutlined,
  FilePdfOutlined,
  Html5Outlined,
  DeleteOutlined,
  FolderAddFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

interface DropdownMenuProps {
  onExportPDF: () => void;
  onExportHTML: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onExportPDF, onExportHTML }) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Space>
          <FilePdfOutlined />
          <span onClick={onExportPDF}>Export to PDF</span>
        </Space>
      ),
      key: "0",
    },
    {
      label: (
        <Space>
          <FolderAddFilled />
          <span>Add to folder</span>
        </Space>
      ),
      key: "4",
      children: [
        {
          key: "4-1",
          label: "AB",
          onClick: () => {
            console.log("a");
          },
        },
      ],
    },
    {
      label: (
        <Space>
          <Html5Outlined />
          <span onClick={onExportHTML}>Export to HTML</span>
        </Space>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Space className="text-rose-500">
          <DeleteOutlined />
          <span>Delete bookmark</span>
        </Space>
      ),
      key: "3",
    },
  ];
  
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <MoreOutlined rotate={90} />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
