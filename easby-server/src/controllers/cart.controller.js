import { Cart } from '../models/cart.model.js';
import { CartItem } from '../models/cartItem.model.js';
import { Product } from '../models/product.model.js';

const findCustomerCart = async (req, res) => {
  try {
    const customer = req.customer;
    const customerId = customer._id;

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      return res
        .status(401)
        .json({ success: false, message: 'Customer does not exists' });
    }
    let cartItem = await CartItem.find({ cart: cart._id }).populate('product');
    if (!cartItem) {
      return res
        .status(401)
        .json({ success: false, message: 'Cart Item does not present' });
    }

    cart.cartItem = cartItem;

    let totalPrice = 0;
    let totalDiscountPrice = 0;
    let totalItem = 0;

    for (let item of cart.cartItem) {
      totalPrice += item.price;
      totalDiscountPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.discount = totalPrice - totalDiscountPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountPrice;

    return res
      .status(200)
      .json({ data: cart, success: true, message: 'Cart found Successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while finding the cart',
    });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const customer = req.customer;
    const customerId = customer._id;

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      return res
        .status(401)
        .json({ success: false, message: 'Customer does not exists' });
    }
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(401).json({
        success: false,
        message: 'Product does not found in the cart',
      });
    }

    if (!req.body.size) {
      return res.status(400).json({ success: false, message: 'Select a Size' });
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      customer: customer._id,
    }).populate('product');

    if (isPresent) {
      return res.status(200).json({
        success: false,
        message: 'Product already exists in the cart',
      });
    }

    const cartItem = await CartItem.create({
      product: product._id,
      cart: cart._id,
      quantity: 1,
      customer: customer._id,
      price: product.price,
      size: req.body.size,
      discountedPrice: product.discountedPrice,
    });

    const createdCartItem = await cartItem.save();
    cart.cartItem.push(createdCartItem);
    await cart.save();

    return res.status(200).json({
      data: createdCartItem,
      success: true,
      message: 'Product added to cart Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while adding item to cart',
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    const customerId = req.customer._id;

    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: 'Cart not found' });
    }

    await CartItem.deleteMany({ _id: { $in: cart.cartItem } });

    cart.cartItem = [];
    cart.totalPrice = 0;
    cart.totalItem = 0;
    cart.totalDiscountedPrice = 0;
    cart.discount = 0;

    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: 'Cart Emptied Successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error Emptying the Cart',
    });
  }
};

export { findCustomerCart, addItemToCart, emptyCart };
