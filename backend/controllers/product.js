// const asyncHandler = require("express-async-handler");
// const Product = require("../models/Product");

// exports.getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10;
//   const page = Number(req.query.pageNumber) || 1;

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//     : {};

//   const count = await Product.countDocument({ ...keyword });
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1));

//   res.json({ products, page, pages: Math.ceil(count / pageSize) });
// });

// exports.getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// exports.deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     await product.remove();
//     res.json({ msg: "Product Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// exports.createProduct = asyncHandler(async (req, res) => {
//   req.body.user = req.user.id;
//   const product = await Product.create(req.body);

//   res.status(201).json(product);
// });

// exports.updateProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     image,
//     brand,
//     category,
//     countInStock,
//   } = req.body;

//   const fieldToUpdate = {
//     name,
//     price,
//     description,
//     image,
//     brand,
//     category,
//     countInStock,
//   };

//   const product = await Product.findOneAndUpdate(req.params.id, fieldToUpdate, {
//     new: true,
//     runValidators: true,
//   });

//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// exports.createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findById(req.params.id);

//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user.id.toString()
//     );

//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error("Product alread reviewed");
//     }

//     const review = {
//       name: req.user.name,
//       rating: rating(Number),
//       comment,
//       user: req.user.id,
//     };

//     product.review.push(review);
//     product.numReviews = product.reviews.length;

//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ msg: "Review added" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });

// exports.getTopProducts = asyncHandler(async (req, res) => {
//   const products = await Products.find({}).sort({ rating: -1 }).limit(3);

//   res.json(products);
// });
