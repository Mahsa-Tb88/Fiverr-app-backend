import jwt from "jsonwebtoken";
import createdError from "../utils/createdError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createdError(401, "You are not authenticated"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) return next(createdError(404, "token is not valid"));

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    console.log(req.isSeller);
    
    next();
  });
};
