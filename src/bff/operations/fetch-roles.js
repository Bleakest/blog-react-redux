import { getRoles } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const fetchRoles = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(accessRoles, userSession)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  const roles = await getRoles();

  return {
    error: null,
    res: roles,
  };
};
