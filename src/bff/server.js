import {
  authorize,
  fetchUsers,
  fetchRoles,
  logout,
  register,
  updateUserRole,
  removeUser,
} from "./operations";

export const server = {
  authorize,
  register,
  logout,
  fetchUsers,
  fetchRoles,
  updateUserRole,
  removeUser,
};
