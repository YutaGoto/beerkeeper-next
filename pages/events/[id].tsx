import type { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import {Layout, Typography, Row, Col, Button, notification} from 'antd'
import { BookOutlined, ClockCircleOutlined, IdcardOutlined, MoneyCollectOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';

import fetcher from '../../lib/fetcher'
import { useToken } from '../../hook/useToken'
import Header from '../../components/Header'
import React, { useState } from 'react'
import axios from 'axios'

const {Title, Paragraph} = Typography
const {Content} = Layout

const EventDetail: NextPage = () => {
  const router = useRouter()
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { id } = router.query
  const {token} = useToken()

  if (!token) {
    router.replace('/login')
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data, error} = useSWR([`/events/${id}`, token.token], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const isParticipant = !!data.data.participations.find((participation) => participation.user === token.id)

  const submitParticipation = () => {
    setBtnLoading(true)
    axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8';
    axios.post(
      `${process.env.BASE_URL}/events/${id}/participant`,
      {},
      { headers: { Authorization: `Bearer ${token.token}` } }
    ).then(() => {
      setBtnLoading(false)
      notification.success({
        message: '参加登録しました'
      })
      return
    }).catch((err) => {
      setBtnLoading(false)
      notification.warn({
        message: `エラーが発生しました。もう一度試してください。${err.message}`
      })
      return
    })
  }

  const deleteParticipation = () => {
    setBtnLoading(true)
    axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8';
    axios.delete(
      `${process.env.BASE_URL}/events/${id}/participant`,
      { headers: { Authorization: `Bearer ${token.token}` } }
    ).then(() => {
      setBtnLoading(false)
      notification.success({
        message: '参加登録解除しました'
      })
      return
    }).catch((err) => {
      setBtnLoading(false)
      notification.warn({
        message: `エラーが発生しました。もう一度試してください。 ${err.message}`
      })
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
              <Title>{data.data.name}</Title>

              <Paragraph>
                <ul>
                  <li><MoneyCollectOutlined />{data.data.budget}</li>
                  <li><ClockCircleOutlined />{data.data.start_at} ～ {data.data.end_at}</li>
                  <li><UserOutlined />{data.data.max_size}</li>
                  <li><PushpinOutlined />{data.data.location}</li>
                  <li><BookOutlined />{data.data.description}</li>
                  <li><IdcardOutlined />{data.data.organizer.name}</li>
                </ul>
              </Paragraph>

              <Paragraph>
                {isParticipant ? <>
                  <Button danger type="primary" loading={btnLoading} onClick={() => deleteParticipation()}>参加登録解除する</Button>
                </> : <>
                  <Button type="primary" loading={btnLoading} onClick={() => submitParticipation()}>参加登録する</Button>
                </>}
              </Paragraph>

            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}

export default EventDetail
