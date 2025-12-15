const loginUser = require("../model/movieRegisterSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginRoutes = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "both fields required", success: false });
    }
    const user = await loginUser.findOne({ email });
    if (!user) return res.status(401).json({ message: "first register then login", success: false });

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return res.status(401).json({ message: "invalid credentials", success: false });

    //  payload
    const payload = {
      name: user.name,
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax"
    // });
res.cookie("token", token, {
  httpOnly: true,
  // secure: true,
    secure: process.env.NODE_ENV === "production",

  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});

    return res.status(200).json({
      success: true,
      message: "user login successful",
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (Err) {
    console.log(Err)
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
