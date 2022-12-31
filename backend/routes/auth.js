const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Tathagatisagoodboy";

//ROUTE-1     Create a User using :POST "/api/auth/createuser"-- Sign Up & No Login Required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }), //Express Validatpr
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors ,return bad request  ---Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check wheather the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let sucess=false;
        return res
          .status(400)
          .json({sucess, error: "Sorry a user with email already exists" });
      }
      const salt = await bcrypt.genSalt(10); // bcrypt js salt gen
      const secPass = await bcrypt.hash(req.body.password, salt); // Password Hashing using bcryptjs
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, //Hashed Password is entered into database
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      sucess=true;
      const authToken = jwt.sign(data, JWT_SECRET); // Token is signed using JWT(JSON Web Token) using payload data(id of new user+ Signature)
      res.json({ sucess,authToken }); //After SignUp a token is generated and sent
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

// ROUTE-2   Authenticate a user :POST "api/auth/login"  Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    // If there are errors ,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please Try to Login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
       let sucess=false;
        return res
          .status(400)
          .json({ sucess,error: "Please Try to Login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); // Token is signed using JWT(JSON Web Token) using payload data(id of new user+ Signature)
        sucess=true;
      res.json( {sucess,authToken} );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//ROUTE-3 Get Logged In User Details :POST "api/auth/getuser"  Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
