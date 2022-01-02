import type { NextPage } from 'next'
import Head from 'next/head'
import {Layout, Typography, Row, Col} from 'antd'

import { useRouter } from 'next/router'

import Header from '../components/Header'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import useUser from '../data/set-user'

const {Title} = Typography

const Home: NextPage = () => {
  const {loggedOut, token} = useUser()
  const router = useRouter()

  if (loggedOut) {
    router.replace('/login')
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data} = useSWR([`/users/profile`, token], fetcher)

  const {Content} = Layout

  return (
    <div>
      <Head>
        <title>Beerkeeper</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />

        <Content className='main-content'>
          <Row>
            <Col span={18} offset={3} className="">
              <Title>Welcome BeerKeeper</Title>
              {data && <Title level={2}>Hello, {data.data.name}</Title> }
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}

export default Home
