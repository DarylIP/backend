import { validationResult } from "express-validator";

const validatorResponse = (req, res, next) => {
  // validation error when email on keyin properly
  const validationError = validationResult(req).array();
  if (validationError.length > 0) {
    const serverRes = {
      message: "Invalid Request",
      error: validationError,
    };
    res.status(403).json(serverRes);
    return;
  } else {
    next();
  }
};

export default validatorResponse;
