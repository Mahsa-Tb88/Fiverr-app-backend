import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export async function checkToken(req, res, next) {
  console.log("checkToken...", req.cookies.token);
  if (req.cookies.token) {
    const token = req.cookies.token;
    try {
      const decode = jwt.verify(token, process.env.SECRET_Key);
      if (decode) {
        const user = await User.findById(decode.id);
        req.username = user.username;
        req.isSeller = user.isSelected;
        req.UserId = user._id.toString();
      }
      return next();
    } catch (e) {
      return next();
    }
  }
  next();
}

export async function isLoggedIn(req, res, next) {
  if (req.username) {
    next();
  } else {
    res.fail("Please login first");
  }
}
