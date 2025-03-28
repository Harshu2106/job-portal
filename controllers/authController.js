import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next(new Error("Please provide name"));
  }
  if (!email) {
    next(new Error("Please provide email"));
  }

  if (!password) {
    next(new Error("Please provide password bigger than 6 characters"));
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(200)
      .send({ success: false, message: "Email is already registered" });
  }
  const user = await userModel.create({ name, email, password });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  //validate
  if (!email || !password) {
    next(new Error("Please provide email and password"));
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next(new Error("Invalid Username or Password"));
  }

  //comparing and matching password

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next(new Error("Invalid Username or Password"));
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
