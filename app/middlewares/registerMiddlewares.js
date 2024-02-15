import { REGEX_EMAIL, REGEX_PASSWORD } from "../constants/regexValidator.js";
import { findUser } from "../services/userServices.js";
import bcrypt from "bcrypt";

export const validateRegisterRequestBody = (req, res, next) => {
  const { firstName, lastName, email, password, address } = req.body;

  if (!firstName) {
    return res.status(400).json({
      message: "Please enter your first name",
    });
  }
  if (!lastName) {
    return res.status(400).json({
      message: "Please enter your last name",
    });
  }
  if (typeof email !== "string" || !REGEX_EMAIL.test(email)) {
    return res.status(400).json({
      message: "Please enter an email",
    });
  }
  if (typeof password !== "string" || !REGEX_PASSWORD.test(password)) {
    return res.status(400).json({
      message:
        "Password must have minimum 8 characters , at least 1 number, and at least 1 special character",
    });
  }

  if (!address) {
    return res.status(400).json({
      message: "Please enter your address",
    });
  }

  next();
  // if (emailPattern.test(email) === false) {
  //   return res.status(400).json({
  //     message: "Please provide a valid email format",
  //   });
  // }
};

export const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUser(email);

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      message: "Wrong password",
    });
  }

  req.user = {
    userId: user.id,
    roleId: user.roleId,
  };

  next();
};
