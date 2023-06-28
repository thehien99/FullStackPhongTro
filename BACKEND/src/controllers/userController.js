import * as authService from "../services/userService";

const register = async (req, res) => {
  const {name, phone, password} = req.body;
  try {
    if (!name || !phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const {phone, password} = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

const getOneUser = async (req, res) => {
  const {id} = req.user;
  try {
    const response = await authService.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login: login,
  register: register,
  getOneUser: getOneUser,
};
