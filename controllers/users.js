const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersService = require("../services/users");
const { validateLogin, validateRegister } = require("../validator/validator");

const getUsers = async (req, res) => {
  try {
    const users = await UsersService.findAll({
      include: { bagProducts: true },
    });

    res.status(200).send(users);
  } catch (error) {}
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UsersService.findUser({
      where: { id: Number(id) },
      include: { bagProducts: true },
    });

    res.status(200).send(user);
  } catch (error) {}
};

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);

    if (error) {
      return res.send(error.details.map((item) => item.message));
    }
    const emailExist = await UsersService.findUser({
      where: { email: req.body.email },
    });

    if (emailExist) return res.status(400).send("Email already exists");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const args = {
      data: { ...req.body, password: hashedPassword },
    };
    const newUser = await UsersService.addUser(args);

    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).status(200).send(token);
  } catch (error) {}
};

const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.send(error.details.map((item) => item.message));
    }

    const user = await UsersService.findUser({
      where: { email: req.body.email },
    });

    if (!user) return res.status(400).send("Email is not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).status(200).send(token);
  } catch (error) {}
};

const editUser = async (req, res) => {
  try {
    const updatedUser = await UsersService.editUser({
      where: { id: Number(req.body.id) },
      data: { ...req.body },
    });
    return res.status(200).send(updatedUser);
  } catch (error) {}
};

const editUserPassword = async (req, res) => {
  try {
    const user = await UsersService.findUser({
      where: { id: Number(req.body.id) },
    });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).send("Invalid password");

    if (req.body.password === req.body.newPassword)
      return res.status(400).send("You have entered the current password");

    if (req.body.newPassword !== req.body.confirmedPassword)
      return res.status(400).send("Invalid new password");

    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    const editedUser = await UsersService.editUserPassword({
      where: { id: Number(req.body.id) },
      data: { password: hashedNewPassword },
    });

    return res.status(200).send(editedUser);
  } catch (error) {}
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getUserById,
  editUser,
  editUserPassword,
};
