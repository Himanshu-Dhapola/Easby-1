import { Customer } from '../models/customer.model.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header('authorization')?.replace('Bearer ', '') || req.cookies?.accessToken    

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized Request' });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const customer = await Customer.findById(decodedToken?._id).select(
      '-password'
    );

    if (!customer) {
      return res.status(403).json({ success: false, message: 'Invalid Token' });
    }

    req.customer = customer;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({
        success: false,
        message: error?.error || 'Invalid Access Token',
      });
  }
};
