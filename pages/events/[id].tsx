import type { NextPage } from 'next'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import {Layout, Typography, Row, Col} from 'antd'
import { BookOutlined, ClockCircleOutlined, IdcardOutlined, MoneyCollectOutlined, PushpinOutlined, UserOutlined } from '@ant-design/icons';

import fetcher from '../../lib/fetcher'
import { useToken } from '../../hook/useToken'
import Header from '../../components/Header'
import React from 'react'

const {Title, Paragraph} = Typography

const EventDetail: NextPage = () => {
  const router = useRouter()
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

  return (
    <div>
      <Head>
        <title>event</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />

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

          </Col>
        </Row>
      </Layout>
    </div>
  )
}

export default EventDetail
