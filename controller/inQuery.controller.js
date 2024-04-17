import InQuery from "../model/inquery.modal";

export const postInQuery = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    await InQuery.create({
      firstName,
      lastName,
      email,
      message,
    });
    res.status(200).json({ message: "we received your in query" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
