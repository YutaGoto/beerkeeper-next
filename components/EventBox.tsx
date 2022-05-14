import { Box, Text } from "@chakra-ui/react";
import { NextComponentType, NextPageContext } from "next";
import { Event } from "../types";
import { ModifiedLink } from "./Link";

interface EventBoxProps {
  event: Event;
}

const EventBox: NextComponentType<NextPageContext, null, EventBoxProps> = ({
  event,
}) => {
  return (
    <ModifiedLink
      href={`/events/${event.id}`}
      passHref={true}
      _hover={{
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <Box borderWidth="1px" borderRadius="lg" mb={2}>
        <Box p={4}>
          <Box color="gray.500" fontSize="xs">
            <Text>{event.start_at}</Text>
          </Box>
          <Box color="gray.900" fontSize="xl">
            <Text>{event.name}</Text>
          </Box>
          <Box color="gray.500" fontSize="xs">
            <Text>{event.location}</Text>
          </Box>
        </Box>
      </Box>
    </ModifiedLink>
  );
};

export default EventBox;
