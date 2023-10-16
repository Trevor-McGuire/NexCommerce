const { Product, Category } = require("../../models");


const productResolver = {
  Query: {
    readProducts: async (_, { _id, category, search }) => {
      let filter = {};
    
      if (_id) {
        filter._id = _id;
      }
    
      if (category) {
        const categoryObj = await Category.findOne({ name: category });
        filter.category = categoryObj._id;
      }
    
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
    
      const products = await Product.find(filter)
        .populate("category")
        .populate("images")
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
          },
        });
      return products;
    },

    getProductInfo: async (_, { productId }) => {
      const product = await Product.findById(productId)
        .populate("reviews")
      product.stars = [0,0,0,0,0,0,]
      console.log(product.reviews)
      product.reviews.map((review) => {
        product.stars[review.rating] += 1;
      });
      return product;
    },
    getProductImages: async (_, { productId, fetchFirstImageOnly }) => {
      const product = await Product.findById(productId)
        .populate("images");
      if (fetchFirstImageOnly) {
        return [product.images[0]];
      }
      console.log(product.images)
      return product.images
    },
    getProductReviews: async (_, { productId, rating, date, page, pageSize }) => {
      const product = await Product.findById(productId)
        .populate({
          path: "reviews",
          populate: {
            path: "user",
            model: "User",
          },
        });
      let reviews = product.reviews;
      if (rating) {
        reviews = reviews.filter((review) => review.rating === rating);
      }
      if (date) {
        reviews = reviews.filter((review) => review.createdAt === date);
      }
      if (page && pageSize) {
        reviews = reviews.slice(
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        );
      }
      return reviews;
    },
  },
};

module.exports = productResolver;
