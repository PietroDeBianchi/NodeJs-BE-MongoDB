const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ENV Vars
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "7d";

exports.register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, roles, phone } = req.body;
        // Verify existing User by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Utente già esistente con questa email",
            });
        }
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new User
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone: phone || null,
            roles: roles || "user",
        });
        const createdUser = await newUser.save();
        // Remove password from response
        const userResponse = createdUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: "Utente creato correttamente",
            data: userResponse,
            count: 1,
        });
    } catch (error) {
        console.error("Errore registrazione:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check User
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utente non trovato con questa email",
            });
        }
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password errata",
            });
        }
        // Create token JWT
        const tokenPayload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: "Login effettuato con successo",
            data: { token, user: userResponse },
        });
    } catch (error) {
        console.error("Errore login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.me = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utente non trovato",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
