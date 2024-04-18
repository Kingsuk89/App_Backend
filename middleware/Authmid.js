import jwt from "jsonwebtoken";

export const authVerify = (req, res, next) => {
  try {
    const token = req.header("X-Auth-Token");

    if (!token) {
      return res.status(400).json("User invalid credentials");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) {
      return res.status(400).json("User invalid credentials");
    }
    req.user = data.id;
    return next();
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
