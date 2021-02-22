const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, res);
  } else {
    return next(new ErrorResponse("Invalid email or password", 400));
  }
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorResponse("User already exists", 400));
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
  const users = await User.find({});

  res.json(users);
});

exports.removeUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ msg: "User Removed" });
  } else {
    return next(new ErrorResponse("User not found", 404));
  }
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    return next(new ErrorResponse("User not found", 404));
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
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
    return next(new ErrorResponse("User not found", 404));
  }
});

const sendTokenResponse = async (user, status, res) => {
  const token = await user.getJwtToken();

  res.status(status).json({ token });
};
