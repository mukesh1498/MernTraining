const User = require("../models/RegisterUser");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_Key = "fyr74647y7v65656783456789fghtrh{}tr66vbyf7fbv7vb";
require("dotenv").config();

// define route handler
exports.registerUser = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    email = email.toLowerCase();
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Server-side validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: 'Email is already registered' });
        }
        // Create a new user
        const newUser = new User({ firstName, lastName, email, password: encryptedPassword });
        // Save the user to the database
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

