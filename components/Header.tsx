import { Button, PageHeader } from 'antd';
import { useRouter } from "next/dist/client/router";
import React from "react";
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";

const Header = () => {
  const {removeItem} = useStorage()
  const {token} = useToken()
  const router = useRouter()

  const handleLogout = () => {
    removeItem('token')
    router.replace('/login')
  }

  if (token) {
    return (
      <PageHeader
        title="BeerKeeper"
        extra={[
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
