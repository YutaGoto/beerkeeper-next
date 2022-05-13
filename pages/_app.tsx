import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  NotificationContext,
  SetNotificationType,
} from "../contexts/NotificationContext";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const [notificationValue, setNotificationValue] =
    useState<SetNotificationType>({ body: "", type: "info" });

  return (
    <ChakraProvider>
      <NotificationContext.Provider
        value={{
          type: notificationValue.type,
          body: notificationValue.body,
          setNotification: setNotificationValue,
        }}
      >
        <Component {...pageProps} />
      </NotificationContext.Provider>
    </ChakraProvider>
  );
}
