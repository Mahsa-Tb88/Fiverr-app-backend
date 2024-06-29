import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

export async function registerUser(req, res) {
  const { fullName, username, email, isSeller, password } = req.body;

  try {
    const user1 = await User.findOne({ username });
    const user2 = await User.findOne({ email });
    if (user1 || user2) {
      res.fail("Username or email is already exist", 500);
      return;
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      fullName,
      username,
      email,
      isSeller,
      password: hashPassword,
    });
    newUser.password = undefined;
    res.success("Your registration was done successfully!", newUser);
  } catch (e) {
    res.fail(e.message, 500);
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.fail("Please Enter username and password");
    return;
  }
  let token;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcryptjs.compare(password, user.password);
      if (match) {
        token = jwt.sign(
          { id: user._id, isSeller: user.isSeller },
          process.env.SECRET_KEY
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000 * 24,
          sameSite: "None",
          secure: false,
        });
        user.password = undefined;
        console.log("token in login..", token);
        res.success("You logged in successfully!", user);
      } else {
        res.fail("Username or Password is not correct!", 404);
      }
    } else {
      res.fail("Username or Password is not correct!", 404);
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}

export async function signOut(req, res) {
  res.clearCookie("token");
  res.success("cookie cleared successfully!");
}
