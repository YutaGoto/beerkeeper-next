import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'

import useStorage from '../hook/useStorage'
import React, { ReactElement } from 'react'
import { Form, Input, Button, Layout, notification } from 'antd'
import Header from '../components/Header'

const { Content } = Layout;

interface LoginInfo {
  email?: string
  password?: string
}

const Login = (): ReactElement => {
  const {setItem} = useStorage()
  const router = useRouter()

  const onSubmit = (values: LoginInfo) => {
    const body = JSON.stringify({
      email: values.email,
      password: values.password
    })
    axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8';
    axios.post(`${process.env.BASE_URL}/users/login`, body).then(res => {
      if (res.data.data.token) {
        setItem('token', res.data.data.token)
        router.push({
          pathname: '/',
          query: {
            notificationType: 'success',
            notificationMessage: 'ログインに成功しました',
          }
        })
        return
      } else {
        notification.warn({
          message: 'エラーが発生しました。もう一度試してください'
        })
        return
      }
    }).catch((err) => {
      notification.error({
        message: 'メールアドレスまたはパスワードが違います'
      })
      return
    })
  }

  return (
    <div>
      <Head>
        <title>login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Content>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  )
}

export default Login
