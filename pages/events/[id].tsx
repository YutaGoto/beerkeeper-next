import type { NextPage } from "next";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Head from "next/head";
import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Text,
  Grid,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { axios } from "../../lib/axios";
import fetcher from "../../lib/fetcher";
import { Event } from "../../types";
import useUser from "../../data/set-user";
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

      <Container maxW="3xl">
        <Text fontSize="5xl">{event.name}</Text>
        <Text fontSize="md">主催: {event.organizer.name}</Text>
        <Text fontSize="xl">{event.start_at}</Text>

        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
          gap={1}
          mt={3}
        >
          <div>
            <Text fontSize="2xl">詳細</Text>
            <Text mb={2}>{event.description}</Text>
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
          </div>
          <div>
            <Table>
              <Tbody>
                <Tr>
                  <Th>料金</Th>
                  <Td>{event.budget}</Td>
                </Tr>
                <Tr>
                  <Th>場所</Th>
                  <Td>{event.location}</Td>
                </Tr>
                <Tr>
                  <Th>開催期間</Th>
                  <Td>
                    {event.start_at} ～ {event.end_at}
                  </Td>
                </Tr>
                <Tr>
                  <Th>最大人数</Th>
                  <Td>{event.max_size}</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </Grid>
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
