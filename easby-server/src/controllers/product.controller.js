import { Product } from '../models/product.model.js';

const createProduct = async (req, res) => {
  try {
    const reqData = req.body;

    const product = await Product.create({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discountPercentage: reqData.discountPercentage,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      size: reqData.size,
      quantity: reqData.quantity,
      category: reqData.category,
    });

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Something went Wrong while creating the product',
      });
    }

    return res.status(201).json({
      data: product,
      success: true,
      message: 'Product Created Succesfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while cresting the product',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = findProductById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product is not found so can not be deleted',
      });
    }
    await Product.findByIdAndDelete(product);
    return res
      .status(201)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      suucess: false,
      message: 'Something went wrong while deleting the product',
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const reqData = req.body;
  await Product.findByIdAndUpdate(productId, reqData);
  return res
    .status(200)
    .json({ success: true, message: 'Product updated successfully' });
};

const findProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).exec();
  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: 'Product not found' });
  }
  return res.status(201).json({
    data: product,
    success: true,
    message: 'Product Found successfully',
  });
};


const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    });
    return res
      .status(200)
      .json({ products, success: true, message: 'Searched products' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Search products error',
    });
  }
};

const categorySearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      category: { $regex: keyword, $options: 'i' },
    });

    return res.status(200).json({
      products,
      success: true,
      message: 'products found according to category',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Category products error',
    });
  }
};

export {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  searchProducts,
  categorySearch,
};
