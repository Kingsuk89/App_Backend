export const verifySchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      ...req.body,
    });
    next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
