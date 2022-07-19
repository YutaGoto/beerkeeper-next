import { Center, Spinner } from "@chakra-ui/react"

export const Loading = () => {
  return <Center h='100vh'>
    <Spinner size="xl" color='red.500' />
  </Center>;
};
