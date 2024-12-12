const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/create-user", async (req, res) => {
    const { email, userName, fullName, password, phone, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            userName: userName,
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            role: role,
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating user" });
    }
});

module.exports = router;
