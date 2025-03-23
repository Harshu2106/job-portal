import userModel from "../models/userModel.js";

export const userUpdateController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    return next("Please provide all the details");
  }

  // console.log("User ID:", req.user.userId); // Debugging line

  const user = await userModel.findOne({ _id: req.user.userId });

  user.name = req.body.name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({ user, token });
};
