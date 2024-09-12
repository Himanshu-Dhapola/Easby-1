import { CartItem } from '../models/cartItem.model.js';
import { Customer } from '../models/customer.model.js';

const updateCartItem = async (req, res) => {
  const customer = req.customer;
  const cartItemData = req.body;

  const item = await CartItem.findById(req.params.id).populate('product');

  if (!item) {
    return res
      .status(401)
      .json({ success: false, message: 'Item is not present in the cart' });
  }

  const findCustomer = await Customer.findById(customer._id);

  if (!findCustomer) {
    return res
      .status(401)
      .json({ success: false, message: 'Customer not found' });
  }

  if (findCustomer._id.toString() === customer._id.toString()) {
    item.quantity = cartItemData.quantity;
    item.price = item.quantity * item.product.price;
    item.discountedPrice = item.quantity * item.product.discountedPrice;
    const updatedCartItem = await item.save();

    return res.status(201).json({
      data: updatedCartItem,
      success: true,
      message: 'Cart Item updated Successfully',
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'You cannot update this cart',
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const customer = req.customer;
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) {
      return res
        .status(402)
        .json({ success: false, message: 'Cart item does not found' });
    }

    const findCustomer = await Customer.findById(customer._id);

    if (!findCustomer) {
      return res
        .status(402)
        .json({ success: falsse, message: 'Customer does not found' });
    }

    if (findCustomer._id.toString() === cartItem.customer._id.toString()) {
      await CartItem.findByIdAndDelete(req.params.id);
    }

    return res
      .status(200)
      .json({ success: true, message: 'Cart item Removed Successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the cart item',
    });
  }
};

export { updateCartItem, removeCartItem };
