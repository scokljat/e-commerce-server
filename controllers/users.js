const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { validateLogin, validateRegister } = require("../validator/validator");

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
};

const registerUser = async (req, res) => {
  const { error } = validateRegister(req.body);

  if (error) {
    return res.send(error.details.map((item) => item.message));
  }
  const emailExist = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (emailExist) return res.status(400).send("Email already exists");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await prisma.user.create({
    data: { ...req.body, password: hashedPassword },
  });

  const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(200).send(token);
};

const loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res.send(error.details.map((item) => item.message));
  }
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) return res.status(400).send("Email is not found");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).status(200).send(token);
};

module.exports = { getUsers, registerUser, loginUser };
