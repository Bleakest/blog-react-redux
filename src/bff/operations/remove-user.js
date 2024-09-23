import { deleteUser } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const removeUser = async (userSession, userId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(accessRoles, userSession)) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  deleteUser(userId);

  return {
    error: null,
    res: true,
  };
};
