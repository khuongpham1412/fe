"use client";
import React, { useState } from "react";
import "./globals.css";
import { Layout } from "antd";
import LoginRegisterComponent from "@/app/components/auth/login-register-component";
import Navigation from "@/app/components/layouts/menu";
import { items } from "@/app/enum";
import { Providers } from "@/app/redux/provider";

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
              <LoginRegisterComponent />
              <Navigation data={items} />
            </Sider>
            <Layout>{children}</Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
