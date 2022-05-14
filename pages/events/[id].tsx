import type { NextPage } from "next";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { axios } from "../../lib/axios";
import { useRouter } from "next/router";

import fetcher from "../../lib/fetcher";
import Header from "../../components/Header";
import { Event } from "../../types";
import useUser from "../../data/set-user";
import { Divider, Button, Container } from "@chakra-ui/react";
import { NotificationContext } from "../../contexts/NotificationContext";

const EventDetail: NextPage = () => {
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { id } = router.query;
  const { loggedOut, token, userId } = useUser();
  const { setNotification } = useContext(NotificationContext);

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
        setNotification({
          type: "success",
          body: "参加登録しました",
        });
        return;
      })
      .catch(() => {
        setBtnLoading(false);
        setNotification({
          type: "error",
          body: "エラーが発生しました。もう一度試してください",
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
        setNotification({
          type: "success",
          body: "参加登録を解除しました",
        });
        return;
      })
      .catch(() => {
        setBtnLoading(false);
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

      <Header />

      <Container className="main-content">
        <h1>{event.name}</h1>
        <h2>主催: {event.organizer.name}</h2>
        <h2>{event.start_at}</h2>
        <Divider />
        <h3>詳細</h3>
        {event.description}
        {participation ? (
          <div className="mb-1">
            <Button
              colorScheme="red"
              isActive={!btnLoading}
              onClick={() => deleteParticipation()}
            >
              参加登録解除する
            </Button>
          </div>
        ) : (
          <div className="mb-1">
            <Button
              colorScheme="blue"
              isActive={!btnLoading}
              onClick={() => submitParticipation()}
            >
              参加登録する
            </Button>
          </div>
        )}
        {event.budget}
        {event.start_at} ～ {event.end_at}
        {event.max_size}
        {event.location}
      </Container>
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
