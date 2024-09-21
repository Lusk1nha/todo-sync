import { useCookies } from "react-cookie";

export const useIsAuthenticated = () => {
  const [cookies] = useCookies(["user"]);

  if (cookies.user) {
    return true;
  }

  return false;
};
