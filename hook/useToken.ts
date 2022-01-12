import { useState } from "react";
import useStorage from "./useStorage";

interface Token {
  id: number;
  token: string;
}

const readToken = (): Token | undefined => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getItem } = useStorage();

  const token = getItem("token");
  const id = Number(getItem("id"));
  return token != null ? { token, id } : undefined;
};

export const useToken = () => {
  const [token] = useState<Token | undefined>(readToken());

  return {
    token,
  };
};
