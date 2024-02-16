import { REGEX_EMAIL, REGEX_PASSWORD } from "../constants/regexValidator.js";

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
};
