export const transformUser = (dbUser) => ({
  id: dbUser.id,
  login: dbUser.login,
  registredAt: dbUser.registred_at,
  password: dbUser.password,
  roleId: dbUser.role_id,
});
