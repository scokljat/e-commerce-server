const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const UsersService = {
  findAll: async (options) => {
    const users = await prisma.user.findMany(options);

    return users;
  },
  findUser: async (options) => {
    const user = await prisma.user.findUnique(options);

    return user;
  },
  addUser: async (values) => {
    const newUser = await prisma.user.create(values);

    return newUser;
  },
  editUser: async (values) => {
    const editedUser = prisma.user.update(values);

    return editedUser;
  },
};

module.exports = UsersService;
