export const transformUser = (dbUser) => ({
  id: dbUser.id,
  login: dbUser.login,
  registredAt: dbUser.registred_at,
  password: dbUser.password,
  roleid: dbUser.role_id,
});
