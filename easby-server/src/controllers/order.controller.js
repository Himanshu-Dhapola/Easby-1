import { Address } from '../models/address.model.js';
import { Order } from '../models/order.model.js';
import { OrderItem } from '../models/orderItem.model.js';
import { Cart } from '../models/cart.model.js';
import { Customer } from '../models/customer.model.js'

const findCustomerCart = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate(
    'cartItem'
  );
  if (!cart) {
    return res.status(401).json({
      success: false,
      message: 'Customer does not exist or cart is empty',
    });
  }
  return cart;
};

const createOrder = async (req, res) => {
  try {
    const customer = req.customer;
    const shippingAddress = req.body;
    let address;

    if (shippingAddress.id) {
      let existsAddress = await Address.findById(shippingAddress.id);
      if (!existsAddress) {
        return res.status(404).json({
          success: false,
          message: 'Address not found',
        });
      }
      address = existsAddress;
    } else {
      address = await Address.create(shippingAddress);
      address.customer = customer._id;
      await address.save();

      if (!customer.address) {
        customer.address = [];
      }

      customer.address.push(address._id);
      await customer.save();
    }

    const cart = await findCustomerCart(customer._id);

    if (!cart || cart.cartItem.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    const orderItems = [];
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.cartItem) {
      const orderItem = await OrderItem.create({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        customer: customer._id,
        discountedPrice: item.discountedPrice,
      });

      orderItems.push(orderItem);
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    const discount = totalPrice - totalDiscountedPrice;

    const createdOrder = await Order.create({
      customer: customer._id,
      orderItems,
      totalPrice,
      totalDiscountedPrice,
      discount,
      totalItem,
      shippingAddress: address._id,
    });

    return res.status(200).json({
      data: createdOrder,
      success: true,
      message: 'Order Created Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating order',
    });
  }
};

const findOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate({ path: 'customer', populate: { path: 'address' } })
      .populate({ path: 'orderItems', populate: { path: 'product' } })
      .populate('shippingAddress');

    if (!order) {
      return res.status(400).json({
        success: false,
        message: 'Cannot find order',
      });
    }

    const customer = await Customer.findById(order.customer._id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    if (!customer.orders.includes(order._id)) {
      customer.orders.push(order._id);
      await customer.save();
    }

    return res.status(200).json({
      data: order,
      success: true,
      message: "Order found and added to customer's orders successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while finding order',
    });
  }
};


const orderHistory = async (req, res) => {
  try {
    const customerId = req.customer._id;

    const customer = await Customer.findById(customerId).populate({
      path: 'orders',
      populate: {
        path: 'orderItems',
        populate: {
          path: 'product',
        },
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order History retrieved successfully',
      data: customer.orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching order history',
    });
  }
};

export { createOrder, findOrderById, orderHistory };
