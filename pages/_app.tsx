import "../styles/globals.css";
import { useState, Suspense } from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
import {
  NotificationContext,
  SetNotificationType,
} from "../contexts/NotificationContext";
import AlertBox from "../components/AlertBox";
import { Loading } from "../components/Loading";

const Header = dynamic(() => import("../components/Header"), { ssr: false });

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const [notificationValue, setNotificationValue] =
    useState<SetNotificationType>({ body: "", type: "info" });

  return (
    <ChakraProvider>
      <Suspense fallback={<Loading />}>
        <NotificationContext.Provider
          value={{
            type: notificationValue.type,
            body: notificationValue.body,
            setNotification: setNotificationValue,
          }}
        >
          <Header />
          <AlertBox />
          <Component {...pageProps} />
        </NotificationContext.Provider>
      </Suspense>
    </ChakraProvider>
  );
}
