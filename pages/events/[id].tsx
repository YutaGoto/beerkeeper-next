import type { NextPage } from "next";
import useSWR from "swr";
import Head from "next/head";
import React, { useState } from "react";
import { axios } from "../../lib/axios";
import { useRouter } from "next/router";
import { Layout, Typography, Row, Col, Button, notification } from "antd";
import {
  BookOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
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
        {event_id: event.id},
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
      .delete(
        `/participations/${participation?.id}`,
        {
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
            <Col span={18} offset={3} className="">
              <Title>{event.name}</Title>

              <Paragraph>
                <ul>
                  <li>
                    <MoneyCollectOutlined />
                    {event.budget}
                  </li>
                  <li>
                    <ClockCircleOutlined />
                    {event.start_at} ～ {event.end_at}
                  </li>
                  <li>
                    <UserOutlined />
                    {event.max_size}
                  </li>
                  <li>
                    <PushpinOutlined />
                    {event.location}
                  </li>
                  <li>
                    <BookOutlined />
                    {event.description}
                  </li>
                  <li>
                    <IdcardOutlined />
                    {event.organizer.name}
                  </li>
                </ul>
              </Paragraph>

              <Paragraph>
                {participation ? (
                  <>
                    <Button
                      danger
                      type="primary"
                      loading={btnLoading}
                      onClick={() => deleteParticipation()}
                    >
                      参加登録解除する
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      loading={btnLoading}
                      onClick={() => submitParticipation()}
                    >
                      参加登録する
                    </Button>
                  </>
                )}
              </Paragraph>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default EventDetail;
