import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  HeartOutlined,
  GlobalOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href={"/admin"}>Manage</Link>, "admin", <BookOutlined />),
  getItem(
    <Link href={"/explore"}>Explore</Link>,
    "explore",
    <GlobalOutlined />
  ),
  getItem(<Link href={"/liked"}>Liked</Link>, "liked", <HeartOutlined />),
  getItem(
    <Link href={"/extension-setting"}>Setting</Link>,
    "extension-setting",
    <SettingOutlined />
  ),
];

const Navigation = ({ data }: any) => {
  const pathname = usePathname();
  let currentPath = pathname.substring(1);

  return (
    <Menu
      theme="dark"
      selectedKeys={[currentPath]}
      mode="inline"
      items={data}
    />
  );
};

export default Navigation;
