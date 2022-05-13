import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import useStorage from "../hook/useStorage";
import { useToken } from "../hook/useToken";

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
        bg="gray.800"
        color={["white", "white", "primary.700", "primary.700"]}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <Link href="/events/new">
            <Text display="block">イベントを作る</Text>
          </Link>

          <Link onClick={handleLogout}>
            <Text display="block">ログアウト</Text>
          </Link>
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
        bg="gray.800"
        color={["white", "white", "primary.700", "primary.700"]}
      ></Flex>
    );
  }
};

export default Header;
