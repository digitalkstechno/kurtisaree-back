const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String, // 'saree' or 'kurti'
      required: true,
      enum: ['saree', 'kurti'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    fabric: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // Saree specific fields
    work: {
      type: String,
    },
    occasion: {
      type: String,
    },
    blouseIncluded: {
      type: String, // 'Yes' or 'No'
    },
    // Kurti specific fields
    kurtiType: {
      type: String,
    },
    sleeveType: {
      type: String,
    },
    neckType: {
      type: String,
    },
    size: [
      {
        type: String, // S, M, L, XL, XXL
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
