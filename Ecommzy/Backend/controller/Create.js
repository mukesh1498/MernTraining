const express = require("express");
const CreateModel = require("../models/Crud")

exports.Create = async (req, res) => {
    let { name, age, address, country, email } = req.body;
    email = email.toLowerCase();
    console.log("heloo", req.body);

    // Server-side validation
    if (!name || !age || !address || !country || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if the email already exists
        const existingUser = await CreateModel.findOne({ email: email });
        if (existingUser) {
            return res.json({ message: 'Email is already registered' });
        }
        // Create a new user
        const CreateUser = new CreateModel({ name: name, age: age, address: address, country: country, email: email });

        // Save the user to the database
        await CreateUser.save();
        res.json({ message: 'Created  User successfully' });
    } catch (error) {
        console.error('User Creation error:', error);
        res.status(500).json({ message: 'Error User Creation' });
    }
}


exports.getRecord = async (req, res) => {
    try {
        const records = await CreateModel.find(); // Fetch all records from the MongoDB collection
        res.status(200).json({
            success: true,
            res: records,
            message: "Records found"
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

