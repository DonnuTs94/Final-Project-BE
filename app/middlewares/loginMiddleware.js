import { REGEX_EMAIL, REGEX_PASSWORD } from "../constants/regexValidator.js"

export const validateLoginRequestBody = (req, res, next) => {
  const { email, password } = req.body
  if (!email && !password) {
    return res.status(400).json({
      message: "Please provide email and password"
    })
  }

  if (!email) {
    return res.status(400).json({
      message: "Please provide an email"
    })
  }

  if (!password) {
    return res.status(400).json({
      message: "Please provide password"
    })
  }

  if (email) {
    const emailPattern = REGEX_EMAIL

    if (emailPattern.test(email) === false) {
      return res.status(400).json({
        message: "Please provide a valid email format"
      })
    }
  }

  const passwordPattern = REGEX_PASSWORD
  if (passwordPattern.test(password) === false) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, alphanumeric, one uppercase letter, one lowercase letter and symbol"
    })
  }
  next()
}
