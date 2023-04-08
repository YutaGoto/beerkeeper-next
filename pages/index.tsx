import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { Container, SimpleGrid, Text } from "@chakra-ui/react";

import { UserProfile } from "../types/user";
import fetcher from "../lib/fetcher";
import useUser from "../data/set-user";
import EventBox from "../components/EventBox";

interface ResData {
  message: string;
  user: UserProfile;
}

const Home: NextPage = () => {
  const { loggedOut, token } = useUser();
  const router = useRouter();
  const { data } = useSWR<ResData>(
    `/users/profile`,
    (url) => fetcher(url, token),
    {
      suspense: true,
    }
  );

  if (loggedOut || !data?.user) {
    router.replace("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Beerkeeper</title>
        <meta name="description" content="beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="3xl">
        {data && <Text fontSize="xl">こんにちは、{data.user.name}</Text>}

        <Text fontSize="2xl">主催中イベント</Text>
        <SimpleGrid columns={3} spacing={4}>
          {data &&
            data.user.organizingEvents.map((organizingEvent) => (
              <EventBox event={organizingEvent} key={organizingEvent.id} />
            ))}
        </SimpleGrid>

        <Text fontSize="2xl">参加イベント</Text>
        {data &&
          data.user.events.map((event) => (
            <EventBox event={event} key={event.id} />
          ))}
      </Container>
    </>
  );
};

const DynamicHome = dynamic(
  {
    loader: async () => Home,
  },
  { ssr: false }
);

export default DynamicHome;
