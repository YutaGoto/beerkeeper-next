import { Button, PageHeader } from 'antd';
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { NotificationContext } from '../contexts/NotificationContext';
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";


const Header = () => {
  const {setNotification} = useContext(NotificationContext)
  const {removeItem} = useStorage()
  const {token} = useToken()
  const router = useRouter()

  const handleLogout = () => {
    removeItem('token')
    setNotification({
      type: 'success',
      body: 'ログアウトしました'
    })

    router.push({
      pathname: '/login'
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
