import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { Container } from "@chakra-ui/react";

import { UserProfile } from "../types/user";
import Header from "../components/Header";
import fetcher from "../lib/fetcher";
import useUser from "../data/set-user";

interface ResData {
  message: string;
  user: UserProfile;
}

const Home: NextPage = () => {
  const { loggedOut, token } = useUser();
  const router = useRouter();
  const { data } = useSWR<ResData>([`/users/profile`, token], fetcher);

  if (loggedOut) {
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

      <Header />

      <Container>
        <h1>Beerkeeper</h1>
        {data && <p>Hello, {data.user.name}</p>}

        <h2>主催中イベント</h2>
        {data &&
          data.user.organizing_events.map((organizing_event) => (
            <div key={organizing_event.id}>{organizing_event.name}</div>
          ))}

        <h2>参加イベント</h2>
        {data &&
          data.user.events.map((event) => (
            <div key={event.id}>{event.name}</div>
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
