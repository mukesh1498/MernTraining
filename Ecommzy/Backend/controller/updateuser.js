const express = require("express");
const CreateModel = require("../models/Crud")


exports.getUpdateUser = async (req, res) => {
    try {
        const id = req.params.id; // Retrieve email from URL parameter
        console.log(id);
        // Use findOne instead of findByEmail
        CreateModel.findById(id)
            .then(UpdateUser => {
                if (UpdateUser) {
                    res.status(200).json(UpdateUser);
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let updatedUser;
        const userId = req.params.userId; // Retrieve userId from URL parameter
        const existingUser = await CreateModel.findOne({
            _id: { $ne: userId },
            email: req.body.email,
        });

        if (existingUser) {
            // Email already exists and belongs to a different user
            return res.json({ message: 'Email already in use' });
        }
        else {
            updatedUser = await CreateModel.findByIdAndUpdate(
                { _id: userId },
                {
                    name: req.body.name,
                    age: req.body.age,
                    address: req.body.address,
                    country: req.body.country,
                    email: req.body.email.toLowerCase(),
                },
                { new: true }
            );
        }
        if (updatedUser) {
            return res.json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    CreateModel.findByIdAndDelete({ _id: userId })
        .then(result => res.json(result))
        .catch((err) => res.json(err));
}

