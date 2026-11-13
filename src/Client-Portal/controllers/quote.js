const Quotes = require("../../models/quote");

const sentQuote = async (req, res) => {
  try {
    const { name, email, message, purpose } = req.body;

    if (!name || !email || !message || !purpose) {
      return res
        .status(401)
        .json({ success: true, message: "Please fill all fields" });
    }

    const newQuote = await Quotes.create({
      name,
      email,
      message,
      purpose,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Quote sent successfully",
      });
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: err });
  }
};

module.exports = { sentQuote };
