const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/order");

router.use(protect);

router.route("/").get(admin, getOrders).post(addOrderItems);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(admin, updateOrderToDelivered);

module.exports = router;
