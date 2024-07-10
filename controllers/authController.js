import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import createdError from "../utils/createdError.js";

export const registerUser = async (req, res, next) => {
  try {
    const hash = bcryptjs.hashSync(req.body.password, 5);

    const newUser = new User({ ...req.body, password: hash });
    console.log(newUser);
    await newUser.save();
    res.status(201).send("user has been created.");
  } catch (err) {
    next(err);
  }
};

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createdError(404, "user not found"));

    const match = bcryptjs.compareSync(req.body.password, user.password);
    if (!match) return next(createdError(401, "Wrong password or username"));
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.SECRET_KEY
    );

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    next(err);
  }
}

export async function signOut(req, res) {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
}
