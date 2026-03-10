const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, createProduct);
router
  .route('/:id')
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);
router.get('/slug/:slug', getProductBySlug);

module.exports = router;
