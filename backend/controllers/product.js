const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

exports.getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({ product });
  } else {
    return next(new ErrorResponse("Product not found", 404));
  }
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ msg: "Product Removed" });
  } else {
    return next(new ErrorResponse("Product not found", 404));
  }
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({ product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const fieldToUpdate = {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  };

  const product = await Product.findOneAndUpdate(req.params.id, fieldToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }
});

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return next(new ErrorResponse("Product already reviewed", 400));
    }

    const review = {
      name: req.user.name,
      rating: rating(Number),
      comment,
      user: req.user.id,
    };

    product.review.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ msg: "Review added" });
  } else {
    return next(new ErrorResponse("Product not found", 404));
  }
});

exports.getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
