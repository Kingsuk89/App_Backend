import User from "../model/user.model.js";

export const getUser = async (req, res) => {
  try {
    const id = req.user;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "Please register first" });
    }

    const resData = {
      id: user._id,
      name: user.fullName,
      email: user.email,
      isVerified: user.isVerified,
    };
    res.status(200).json(resData);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
