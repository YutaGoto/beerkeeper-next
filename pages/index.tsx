import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { Layout, Typography, Row, Col } from "antd";

import { UserProfile } from "../types/user";
import Header from "../components/Header";
import fetcher from "../lib/fetcher";
import useUser from "../data/set-user";

interface ResData {
  message: string;
  data: UserProfile;
}

const { Title } = Typography;

const Home: NextPage = () => {
  const { loggedOut, token } = useUser();
  const router = useRouter();
  const { data } = useSWR<ResData>([`/users/profile`, token], fetcher);

  if (loggedOut) {
    router.replace("/login");
    return null;
  }

  const { Content } = Layout;

  return (
    <div>
      <Head>
        <title>Beerkeeper</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />

        <Content className="main-content">
          <Row>
            <Col span={18} offset={3} className="">
              <Title>Welcome BeerKeeper</Title>
              {data && <Title level={2}>Hello, {data.data.name}</Title>}
            </Col>
          </Row>

          <Row>
            <Col span={18} offset={3} className="">
              <Title>主催中イベント</Title>
              {data &&
                data.data.organizer_events.map((organizer_event) => (
                  <Title key={organizer_event.id} level={2}>
                    {organizer_event.name}
                  </Title>
                ))}
            </Col>
          </Row>

          <Row>
            <Col span={18} offset={3} className="">
              <Title>参加イベント</Title>
              {data &&
                data.data.events.map((event) => (
                  <Title key={event.id} level={2}>
                    {event.name}
                  </Title>
                ))}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default Home;
