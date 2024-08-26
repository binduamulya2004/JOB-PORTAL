import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //The middleware extracts the JWT from the cookies object in the request:
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //jwt.verify function decodes the token and checks the signature using the secret key (process.env.JWT_SECRET_KEY).
  req.user = await User.findById(decoded.id);

  //With the decoded token in hand, the middleware uses the user ID (decoded.id) to retrieve the user's data from the database:
  next();
});
