import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import {
  Layout,
  Typography,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  notification,
} from "antd";

import { dateToString } from "../../utils/DateString";
import Header from "../../components/Header";
import useUser from "../../data/set-user";
import { axios } from "../../lib/axios";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Content } = Layout;

const EventDetail: NextPage = () => {
  const router = useRouter();
  const { loggedOut, token } = useUser();

  if (loggedOut) {
    router.replace("/login");
    return null;
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
    };

    axios
      .post(`/events`, postBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        router.push({
          pathname: `/events/${res.data.event.id}`,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
        notification.warn({
          message: `エラーが発生しました。もう一度試してください。${err.message}`,
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
              <Title>新規イベント作成</Title>

              <Form onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="budget"
                  label="budget"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="date"
                  rules={[{ required: true }]}
                >
                  <RangePicker showTime />
                </Form.Item>
                <Form.Item
                  name="max_size"
                  label="max_size"
                  rules={[
                    { required: true, type: "number", min: 1, max: 10000 },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="location"
                  label="location"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default EventDetail;
