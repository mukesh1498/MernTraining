const express = require("express");
const router = express.Router();

// Import controllers
const { registerUser } = require("../controller/registerUser");
const { loginUser } = require("../controller/loginUser");
// Define routes for user registration and login
router.post("/register", registerUser);
router.post("/login", loginUser); // Use "login" as the route for user login

module.exports = router;
