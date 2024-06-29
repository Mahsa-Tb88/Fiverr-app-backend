import User from "../models/userSchema.js";

export async function initialize(req, res) {
  let user = {};
  try {
    if (req.username) {
      user = await User.findOne({ username: req.username });
      user.password = undefined;
      console.log("there is req.username");
    }
    res.success("Initialized successfully", user);
  } catch (e) {
    res.fail(e.message, 500);
  }
}
