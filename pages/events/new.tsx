import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'
import {Layout, Typography, Row, Col, Form, Input, InputNumber, DatePicker, Button} from 'antd'

import {dateToString} from '../../utils/DateString'
import { useToken } from '../../hook/useToken'
import Header from '../../components/Header'
import React from 'react'

const {Title} = Typography
const { RangePicker } = DatePicker;
const {Content} = Layout

const EventDetail: NextPage = () => {
  const router = useRouter()
  const {token} = useToken()

  if (!token) {
    router.replace('/login')
    return null
  }

  const onFinish = (values: any) => {
    const postBody = {
      name: values.name,
      budget: values.budget,
      start_at: dateToString(values.date[0]._d),
      end_at: dateToString(values.date[1]._d),
      max_size: values.max_size,
      location: values.location,
      description: values.description,
    }

    axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8';
    axios.post(
      `${process.env.BASE_URL}/events`,
      postBody,
      { headers: { Authorization: `Bearer ${token.token}` } },
    ).then(res => {
      router.push({
        pathname: `/events/${res.data.data.id}`,
        query: {
          notificationType: 'success',
          notificationMessage: 'イベントを作成しました',
        }
      })
      return
    }).catch((err) => {
      console.log(err)
      return
    })
  }

  return (
    <div>
      <Head>
        <title>event</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />

        <Content className='main-content'>
          <Row>
            <Col span={18} offset={3} className="">
              <Title>新規イベント作成</Title>

              <Form onFinish={onFinish}>
                <Form.Item name='name' label='name' rules={[{ required: true }]} >
                  <Input />
                </Form.Item>
                <Form.Item name='budget' label='budget' rules={[{ required: true }]} >
                  <Input />
                </Form.Item>
                <Form.Item name='date' label='date' rules={[{ required: true }]} >
                  <RangePicker showTime />
                </Form.Item>
                <Form.Item name='max_size' label='max_size' rules={[{ required: true, type: 'number', min: 1, max: 10000 }]} >
                  <InputNumber />
                </Form.Item>
                <Form.Item name='location' label='location' rules={[{ required: true }]} >
                  <Input />
                </Form.Item>
                <Form.Item name='description' label='description' rules={[{ required: true }]} >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>

            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}

export default EventDetail
