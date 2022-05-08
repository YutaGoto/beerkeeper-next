import type { NextPage } from "next";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Head from "next/head";
import React, { useState } from "react";
import { axios } from "../../lib/axios";
import { useRouter } from "next/router";
import {
  Layout,
  Typography,
  Row,
  Col,
  Button,
  notification,
  Descriptions,
  Divider,
} from "antd";
import {
  ClockCircleOutlined,
  MoneyCollectOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";

import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import { Event } from "../../types";
import useUser from "../../data/set-user";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const EventDetail: NextPage = () => {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { id } = router.query;
  const { loggedOut, token, userId } = useUser();

  if (loggedOut) {
    router.replace("/login");
  }

  const { data, error } = useSWR([`/events/${id}`, token], fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const event = data.event as Event;
  const participation = event.participations.find(
    (participation) => participation.user_id === userId
  );

  const submitParticipation = () => {
    setBtnLoading(true);
    axios
      .post(
        "/participations",
        { event_id: event.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setBtnLoading(false);
        notification.success({
          message: "参加登録しました",
        });
        return;
      })
      .catch((err) => {
        setBtnLoading(false);
        notification.warn({
          message: `エラーが発生しました。もう一度試してください。${err.message}`,
        });
        return;
      });
  };

  const deleteParticipation = () => {
    setBtnLoading(true);
    axios
      .delete(`/participations/${participation?.id}`, {
        params: {
          event_id: event.id,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBtnLoading(false);
        notification.success({
          message: "参加登録解除しました",
        });
        return;
      })
      .catch((err) => {
        setBtnLoading(false);
        notification.warn({
          message: `エラーが発生しました。もう一度試してください。 ${err.message}`,
        });
        return;
      });
  };

  return (
    <div>
      <Head>
        <title>event</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />

        <Content className="main-content">
          <Row>
            <Col md={{ span: 18, offset: 4 }} sm={{ span: 22, offset: 1 }}>
              <Title>{event.name}</Title>
              <Title level={3}>主催: {event.organizer.name}</Title>
              <Title level={5}>{event.start_at}</Title>

              <Divider />
              <Row>
                <Col md={15} sm={24}>
                  <Paragraph>
                    <Title level={4}>詳細</Title>
                    {event.description}
                  </Paragraph>

                  {participation ? (
                    <div className="mb-1">
                      <Button
                        danger
                        type="primary"
                        loading={btnLoading}
                        onClick={() => deleteParticipation()}
                      >
                        参加登録解除する
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-1">
                      <Button
                        type="primary"
                        loading={btnLoading}
                        onClick={() => submitParticipation()}
                      >
                        参加登録する
                      </Button>
                    </div>
                  )}
                </Col>
                <Col lg={9} md={24}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item
                      label={
                        <>
                          <MoneyCollectOutlined /> <span>料金</span>
                        </>
                      }
                    >
                      {event.budget}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <>
                          <ClockCircleOutlined /> <span>日時</span>
                        </>
                      }
                    >
                      {event.start_at} ～ {event.end_at}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <>
                          <UserOutlined /> <span>最大人数</span>
                        </>
                      }
                    >
                      {event.max_size}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <>
                          <PushpinOutlined /> <span>場所</span>
                        </>
                      }
                    >
                      {event.location}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

const DynamicEventDetail = dynamic(
  {
    loader: async () => EventDetail,
  },
  { ssr: false }
);

export default DynamicEventDetail;
