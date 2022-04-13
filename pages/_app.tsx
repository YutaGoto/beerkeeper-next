import "../styles/globals.css";
import "../styles/antd-custom.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import {
  NotificationContext,
  SetNotificationType,
} from "../contexts/NotificationContext";
import { Layout, notification, ConfigProvider } from "antd";
import enUS from 'antd/lib/locale/en_US';

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const [notificationValue, setNotificationValue] =
    useState<SetNotificationType>({ body: "", type: "info" });

  useEffect(() => {
    if (notificationValue.body !== "") {
      notification[notificationValue.type]({
        message: notificationValue.body,
      });
    }
  }, [notificationValue.body, notificationValue.type]);

  return (
    <ConfigProvider locale={enUS}>
      <NotificationContext.Provider
        value={{ type: "info", body: "", setNotification: setNotificationValue }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContext.Provider>
    </ConfigProvider>
  );
}
