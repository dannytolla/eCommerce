import User from "../models/User";
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
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

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findA({});

  res.json(users);
});

const removeUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ msg: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
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

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  getUserProfile,
  removeUser,
  getUserById,
  updateUser,
};
