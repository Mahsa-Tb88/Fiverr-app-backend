import User from "../models/userSchema.js";

export async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);

    if (user) {
      if (user._id.toString() !== req.uesrId) {
        res.fail("You are not authenticated", 401);
        return;
      }
      res.clearCookie("token");
      res.success("User deleted successfully.", 200);
    } else {
      res.fail("User was not found.", 402);
    }
  } catch (e) {
    res.fail(e.message, 500);
  }
}
