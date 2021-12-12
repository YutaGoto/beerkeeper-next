import { Button, PageHeader, notification } from 'antd';
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const Header = () => {
  const {removeItem} = useStorage()
  const {token} = useToken()
  const router = useRouter()

  useEffect(() => {
    if (router.query.notificationMessage) {
      const type: NotificationType = router.query.notificationType as NotificationType || 'info'
      const message: string = router.query.notificationMessage as string

      notification[type]({
        message: message
      })
    }
  }, [router.query.notificationMessage, router.query.notificationType])

  const handleLogout = () => {
    removeItem('token')
    router.push({
      pathname: '/login',
      query: {
        notificationType: 'success',
        notificationMessage: 'ログアウトしました',
      }
    })
  }

  if (token) {
    return (
      <PageHeader
        title="BeerKeeper"
        extra={[
          <Button key="2" href='/events/new' type="primary">イベントを作る</Button>,
          <Button
            key="1"
            type="primary"
            danger
            onClick={handleLogout}
          >
            Log Out
          </Button>,
        ]}
      >
      </PageHeader>
    )
  } else {
    return <PageHeader title="BeerKeeper" />
  }
}

export default Header
