import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/antd-custom.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { NotificationContext, SetNotificationType } from '../contexts/NotificationContext'
import { Layout, notification } from 'antd'


export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const [notificationValue, setNotificationValue] = useState<SetNotificationType>({body: '', type: ''})

  useEffect(() => {
    if (notificationValue.body !== ''){
      notification[notificationValue.type]({
        message: notificationValue.body
      })
    }
  }, [notificationValue.body, notificationValue.type])

  return (
    <NotificationContext.Provider value={{type: 'info', body: '', setNotification: setNotificationValue}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContext.Provider>
  )
}
