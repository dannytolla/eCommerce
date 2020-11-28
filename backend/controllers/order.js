// const asyncHandler = require("express-async-handler");
// const order = require("../models/Order");

// exports.addOrderItems = asyncHandler(async (req, res) => {
//   const { orderItems } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(404);
//     throw new Error("No order items");
//     return;
//   } else {
//     req.body.user = req.user.id;

//     const order = await Order.create(req.body);

//     res.status(201).json(order);
//   }
// });

// exports.getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate({
//     path: "User",
//     select: "name email",
//   });

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// exports.updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.paid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     const updateOrder = await order.save();

//     res.json(updateOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// exports.getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user.id });
//   res.json(orders);
// });

// exports.getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate("user", "id name");
//   res.json(orders);
// });
