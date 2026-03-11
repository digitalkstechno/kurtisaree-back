const Product = require('../models/Product');

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      fabric,
      color,
      minPrice,
      maxPrice,
      work,
      occasion,
      blouseIncluded,
      kurtiType,
      sleeveType,
      neckType,
      size,
      page = 1,
      limit = 12,
      sort,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (fabric) query.fabric = fabric;
    if (color) query.color = color;
    if (work) query.work = work;
    if (occasion) query.occasion = occasion;
    if (blouseIncluded) query.blouseIncluded = blouseIncluded;
    if (kurtiType) query.kurtiType = kurtiType;
    if (sleeveType) query.sleeveType = sleeveType;
    if (neckType) query.neckType = neckType;
    if (size) query.size = { $in: size.split(',') };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortQuery = {};
    if (sort === 'priceLowHigh') sortQuery.price = 1;
    else if (sort === 'priceHighLow') sortQuery.price = -1;
    else if (sort === 'newest') sortQuery.createdAt = -1;
    else sortQuery.createdAt = -1;

    const skip = (Number(page) - 1) * Number(limit);
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / Number(limit)),
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Get unique filter values for a category
// @route   GET /api/products/filters/:category
// @access  Public
const getFilters = async (req, res) => {
  try {
    const { category } = req.params;
    const query = category ? { category } : {};

    const fabrics = await Product.distinct('fabric', query);
    const colors = await Product.distinct('color', query);
    const occasions = await Product.distinct('occasion', query);
    
    // For kurti specific filters
    const kurtiTypes = await Product.distinct('kurtiType', query);
    const sleeveTypes = await Product.distinct('sleeveType', query);
    const neckTypes = await Product.distinct('neckType', query);

    res.json({
      fabrics: fabrics.filter(Boolean),
      colors: colors.filter(Boolean),
      occasions: occasions.filter(Boolean),
      kurtiTypes: kurtiTypes.filter(Boolean),
      sleeveTypes: sleeveTypes.filter(Boolean),
      neckTypes: neckTypes.filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFilters,
};
