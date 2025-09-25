import Joi from "joi";
import middlewares from "../middlewares/index.js";

class UserValidator {
  constructor() {}

  createUserSchema() {
    return middlewares.validate(
      Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(30).required(),
        // age: Joi.number().integer().min(18).max(100).required(),
      })
    );
  }
}

export default UserValidator;
