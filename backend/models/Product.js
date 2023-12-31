const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: [String],
  price: {
    type: Number,
  },
  category: {
    type: String,
    ref: 'Category',
  },
  stock: Number,
  images: [
    {
      url: String,
    },
  ],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  badges: 
    {
      inStock: Boolean,
    },

});

productSchema.virtual('ratingStats').get(async function () {
  await this.populate('reviews')

  if (!this.reviews || this.reviews.length === 0) {
    return { stars: [0, 0, 0, 0, 0], averageStars: 0 };
  }

  const starCounts = [0, 0, 0, 0, 0];

  this.reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      starCounts[review.rating - 1]++;
    }
  });

  const sumStars = starCounts.reduce((acc, count, index) => acc + count * (index + 1), 0);
  const totalReviews = starCounts.reduce((acc, count) => acc + count, 0);
  const averageStars = totalReviews > 0 ? sumStars / totalReviews : 0;

  return { stars: starCounts, averageStars, totalReviews };
});

productSchema.virtual('image').get(async function () {
  const defaultImage = this.images.find((image) => {
    return image.url.includes('default'); 
  });
  if (defaultImage) return defaultImage.url;
  return this.images.length > 0 ? this.images[0].url : null;
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
