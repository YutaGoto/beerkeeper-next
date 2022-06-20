import { Flex, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";
import { ModifiedLink } from "./Link";

const Header = () => {
  const { setNotification } = useContext(NotificationContext);
  const { removeItem } = useStorage();
  const { token } = useToken();
  const router = useRouter();

  const handleLogout = () => {
    removeItem("token");
    setNotification({
      type: "success",
      body: "ログアウトしました",
    });

    router.push({
      pathname: "/login",
    });
  };

  if (token) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={4}
        bg="gray.100"
        color="black"
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <ModifiedLink
            passHref={true}
            href="/"
            _hover={{ textDecoration: "none" }}
          >
            <Text fontWeight="bold" fontSize="lg">
              Beerkeeper
            </Text>
          </ModifiedLink>

          <ModifiedLink passHref={true} href="/events/new">
            <Text display="block">イベントを作る</Text>
          </ModifiedLink>

          <ChakraLink onClick={handleLogout}>
            <Text display="block">ログアウト</Text>
          </ChakraLink>
        </Stack>
      </Flex>
    );
  } else {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={4}
        bg="gray.100"
        color="black"
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <Text fontWeight="bold" fontSize="lg">
            Beerkeeper
          </Text>

          <ModifiedLink passHref={true} href="/signup">
            <Text display="block">サインアップ</Text>
          </ModifiedLink>

          <ModifiedLink passHref={true} href="/login">
            <Text display="block">ログイン</Text>
          </ModifiedLink>
        </Stack>
      </Flex>
    );
  }
};

export default Header;
