import { generateDate } from "./generate-date";

export const addUser = (login, password) =>
  fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.strinregLoginify({
      login,
      password,
      registred_at: generateDate(),
      role_id: 2,
    }),
  });
