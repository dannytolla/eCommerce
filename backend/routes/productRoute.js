// const express = require("express");
// const router = express.Router();

// const { protect, admin } = require("../middleware/auth");

// const {
//   getProducts,
//   getProductById,
//   createProduct,
//   deleteProduct,
//   updateProduct,
//   createProductReview,
//   getTopProducts,
// } = require("../controllers/product");

// router.route("/").get(getProducts).post(protect, admin, createProduct);
// router.route("/:id/review").post(protect, createProductReview);
// router.route("/top").post(getTopProducts);
// router
//   .route("/:id")
//   .get(getProductById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

// module.exports = router;
