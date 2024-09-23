export const sessions = {
  list: {},
  create(user) {
    const hash = Math.random().toFixed(50);
    this.list[hash] = user;
    return hash;
  },

  remove(hash) {
    delete this.list[hash];
  },

  access(accessRoles, hash) {
    const user = this.list[hash];

    return !!user && accessRoles.includes(user.roleid);
  },
};
