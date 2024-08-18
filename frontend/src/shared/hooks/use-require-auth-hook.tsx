import { RoutesEnum } from "../enums/routes-enum";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRequireAuth = () => {
  const { user } = {
    user: true,
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("useRequireAuth", user);

    if (!user) {
      navigate(RoutesEnum.AUTH);
    }
  }, [user, location]);
};
