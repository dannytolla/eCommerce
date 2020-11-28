// const express = require("express");
const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");

const {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  removeUser,
  updateUser,
} = require("../controllers/user");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, removeUser);

module.exports = router;
