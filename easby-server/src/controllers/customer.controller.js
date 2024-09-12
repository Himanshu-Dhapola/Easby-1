import { Customer } from '../models/customer.model.js';
import { Cart } from '../models/cart.model.js';

const generateAccessAndRefreshToken = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId);
    const accessToken = customer.generateAccessToken();
    await customer.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while Generating Access Token',
    });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: 'Please fill all the required fields',
      });
    }

    const existedCustomer = await Customer.findOne({ email });

    if (existedCustomer) {
      return res.status(402).json({
        success: false,
        message: 'Email id already exists please provide a new email id',
      });
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password,
    });

    const cart = await Cart.create({ customer });

    if (!cart) {
      return res.status(402).json({
        success: false,
        message: 'Something went wrong while creating the cart',
      });
    }

    const createdCustomer = await Customer.findById(customer._id).select(
      '-password'
    );

    if (!createdCustomer) {
      return res.status(402).json({
        success: false,
        message: 'Something went wrong while registering the Customer',
      });
    }

    const createdCart = await cart.save();

    return res.status(200).json({
      data: createdCustomer,
      success: true,
      message: 'Registered Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to Register',
    });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(402).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'EmailId does not exists',
      });
    }

    const isPasswordValid = await customer.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(402).json({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    const { accessToken } = await generateAccessAndRefreshToken(customer._id);

    const loggedInCustomer = await Customer.findById(customer._id).select(
      '-password'
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).cookie('accessToken', accessToken, options).json({
      customer: loggedInCustomer,
      success: true,
      message: 'Login Successfull',
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Login Failed',
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const existedCustomer = await Customer.findById(req.customer?._id)
      .select('-password')
      .populate('address');
    if (!existedCustomer) {
      res.status(404).json({
        success: false,
        message: 'Customer does not exits with this token',
      });
    }
    return res.status(200).json({
      data: existedCustomer,
      success: true,
      message: 'Customer details found',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while getting user details',
    });
  }
};

export { registerCustomer, loginCustomer, getUserDetails };
