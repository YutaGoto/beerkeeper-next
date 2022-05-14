import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { NextComponentType, NextPageContext } from "next";
import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const AlertBox: NextComponentType<NextPageContext, null, {}> = () => {
  const { body, type, setNotification } = useContext(NotificationContext);

  const onClose = () => {
    setNotification({ body: "", type: "info" });
  };

  if (body === "") return null;

  return (
    <Alert
      status={type}
      w={[250]}
      position="fixed"
      zIndex={2}
      top={5}
      right={10}
    >
      <AlertIcon />
      <AlertDescription>{body}</AlertDescription>
      <CloseButton
        alignSelf="flex-end"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default AlertBox;
