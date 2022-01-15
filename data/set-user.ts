import { useToken } from "../hook/useToken";

export default function useUser() {
  const token = useToken();
  const loggedOut: boolean = !(token.token);

  return {
    loggedOut,
    userId: token.token?.id,
    token: token.token?.token,
  };
}
