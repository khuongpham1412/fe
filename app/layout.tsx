"use client";
import React, { useState } from "react";
import "./globals.css";
import { Layout } from "antd";
import LoginButton from "@/app/components/loginButton";
import Navigation from "./components/menu";
import { items } from "./enum";
import { Providers } from "./redux/provider";

const { Sider } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout style={{ maxHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <LoginButton />
              <Navigation data={items} />
            </Sider>
            <Layout>{children}</Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
