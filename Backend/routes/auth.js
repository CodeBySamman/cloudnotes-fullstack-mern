import express from "express";
import User from "../models/User.js";
const router = express.Router();
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file");
}
const JWT_SECRET = process.env.JWT_SECRET;

// Route:1  create a user using :Post "/api/auth/createuser No login required
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name minLength is 3 characters"),
    body("email").isEmail().withMessage("Enter valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password minLength is 8 characters"),
  ],
  // if there are errors, return bad request and the errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //   check whether the user with this email exists already

      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      // password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authentoken = jwt.sign(data, JWT_SECRET);

      res.json({
        success: true,
        authentoken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  },
);


// Route:2 Authenticate a user using :Post "/api/auth/login No login required
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").exists().withMessage("Password is required"),
  ],

  // if there are errors, return bad request and the errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //find user
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }
      //comparepassword
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authentoken = jwt.sign(data, JWT_SECRET);

      res.json({
        success: true,
        authentoken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

// Route:3  Get logged in user detail "/api/auth/getuser  login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Internal Server Error");
  }
});
export default router;
