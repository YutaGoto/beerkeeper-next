import React, { useContext } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import useUser from "../../data/set-user";
import { axios } from "../../lib/axios";
import { Container, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EventFormType } from "../../types";
import EventForm from "../../components/EventForm";
import { NotificationContext } from "../../contexts/NotificationContext";

const NewEvent: NextPage = () => {
  const router = useRouter();
  const { loggedOut, token } = useUser();
  const { register, handleSubmit } = useForm<EventFormType>();
  const { setNotification } = useContext(NotificationContext);

  if (loggedOut) {
    router.replace("/login");
    return null;
  }

  const onFinish = (values: EventFormType) => {
    const postBody = {
      name: values.name,
      budget: values.budget,
      start_at: values.start_at,
      end_at: values.end_at,
      max_size: values.max_size,
      location: values.location,
      description: values.description,
    };

    console.log(postBody);

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
        setNotification({
          type: "error",
          body: "エラーが発生しました。もう一度試してください",
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

      <Container maxW="3xl">
        <Text fontSize="2xl">新規イベント作成</Text>

        <EventForm
          onFinish={handleSubmit(onFinish)}
          register={register}
          submitBtnText="作成"
        />
      </Container>
    </div>
  );
};

const DynamicNewEvent = dynamic(
  {
    loader: async () => NewEvent,
  },
  { ssr: false }
);

export default DynamicNewEvent;
