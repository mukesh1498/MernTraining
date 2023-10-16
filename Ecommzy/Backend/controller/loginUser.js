const User = require("../models/RegisterUser");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_Key = "fyr74647y7v65656783456789fghtrh{}tr66vbyf7fbv7vb";
require("dotenv").config();



exports.loginUser = async (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    console.log(email);
    email = email.toLowerCase();
    try {
        // Find the user by email in your User model
        const user = await User.findOne({ email });
        // Check if the user exists
        if (!user) {
            return res.status(200).json({ message: "User does not exist", success: false });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password", success: false });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_Key, { expiresIn: '1h' });

        res.status(200).json({ status: "ok", data: token, success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}