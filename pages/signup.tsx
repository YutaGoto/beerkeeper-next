import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { axios } from "../lib/axios";
import { NotificationContext } from "../contexts/NotificationContext";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface SignupInfo {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Signup: NextPage = () => {
  const { setNotification } = useContext(NotificationContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignupInfo>();

  const onSubmit = (values: SignupInfo) => {
    const body = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

    axios
      .post("/users/signup", body)
      .then(() => {
        setNotification({
          type: "success",
          body: "登録しました",
        });
        router.push("/login");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setNotification({
            type: "error",
            body: err.response.data.error.join(", "),
          });
        }
      });
  };

  return (
    <>
      <Head>
        <title>signup</title>
        <meta name="description" content="Sign-up Beerkeeper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="name">名前</FormLabel>
            <Input type="name" {...register("name", { required: true })} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input
              type="password"
              {...register("password", { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password_confirmation">
              パスワード確認
            </FormLabel>
            <Input
              type="password"
              {...register("password_confirmation", { required: true })}
            />
          </FormControl>

          <Button mt={2} type="submit" variant="solid" isLoading={false}>
            サインアップ
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Signup;
