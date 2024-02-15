import { REGEX_EMAIL, REGEX_PASSWORD } from '../constants/regexValidator.js';
import { findUser } from '../services/userServices.js';
import bcrypt from 'bcrypt';

export const validateLoginRequestBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }

  if (!email) {
    return res.status(400).json({
      message: 'Please provide an email',
    });
  }

  if (!password) {
    return res.status(400).json({
      message: 'Please provide password',
    });
  }

  if (REGEX_EMAIL.test(email) === false) {
    return res.status(400).json({
      message: 'Please provide a valid email format',
    });
  }

  if (REGEX_PASSWORD.test(password) === false) {
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
