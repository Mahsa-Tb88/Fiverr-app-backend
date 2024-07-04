import User from "../models/userSchema.js";
export async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (req.userId !== user._id.toString()) {
      return res.status(404).send("You can delete only your account");
    }
    await User.findByIdAndDelete(user._id);
    res.status(200).send("User was deleted");
  } catch (e) {
    res.status(500).send("something went wrong");
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send("something went wrong");
  }
}
