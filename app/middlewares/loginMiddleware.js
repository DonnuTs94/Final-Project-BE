import { findUser } from '../services/userServices.js';
import bcrypt from 'bcrypt';

export const validateLoginRequestBody = (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      message: 'Please provide an email',
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide password',
    });
  }

  const { email, password } = req.body;

  if (email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email) === false) {
      return res.status(400).json({
        message: 'Please provide a valid email format',
      });
    }
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordPattern.test(password) === false) {
    return res.status(400).json({
      message:
        'Password must contain at least 8 characters, alphanumeric, one uppercase letter, one lowercase letter and symbol',
    });
  }
  next();
};

export const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      message: 'Wrong password',
    });
  }

  req.user = {
    userId: user.id,
    roleId: user.roleId,
  };

  next();
};
