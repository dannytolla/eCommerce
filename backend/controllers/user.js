const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.registerUser = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user);
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.json(user);
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findA({});

  res.json(users);
});

exports.removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ msg: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const fieldsToUpdate = {
    name,
    email,
    isAdmin,
  };
  const user = await User.findByIdAndUpdate(req.params, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
});

const sendTokenResponse = async (user, status, res) => {
  const token = await user.getJwtToken();

  res.status(status).json(token);
};
