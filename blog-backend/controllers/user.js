const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });

  const token = generate({ id: user.id });

  return { user, token };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    {
      id: ROLES.ADMIN,
      name: "Admin",
    },
    {
      id: ROLES.MODERATOR,
      name: "Moderator",
    },
    {
      id: ROLES.USER,
      name: "User",
    },
  ];
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatches = await bcrypt.compare(password, user.password);

  if (!isPasswordMatches) {
    throw new Error("Wrond password");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

//delete

function deleteuser(id) {
  return User.deleteOne({ _id: id });
}
//edit(roles)
function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteuser,
  updateUser,
};
