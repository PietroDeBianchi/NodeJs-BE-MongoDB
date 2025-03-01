const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// ENV Vars
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";

/**
 * Registers a new user in the database.
 * @param {Object} userData - The user data (email, password, firstName, lastName, roles, phone).
 * @returns {Object} - Returns the created user object without the password.
 * @throws {Error} - Throws error if registration fails.
 */

const registerUser = async (userData) => {
    try {
        const { email, password, firstName, lastName, roles, phone } = userData;

        const cleanEmail = email.trim().toLowerCase();
        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();

        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return { success: false, message: "Email già in uso" };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: cleanEmail,
            password: hashedPassword,
            firstName: cleanFirstName,
            lastName: cleanLastName,
            phone: phone || null,
            roles: roles || "user",
        });
        await newUser.save();
        return { success: true };
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        return { success: false, message: "Errore nella creazione dell'utente" };
    }
};
/**
 * Authenticates a user and generates a JWT token.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Object} - Returns a JWT token and user data without password.
 * @throws {Error} - Throws error if login fails.
 */
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: "Utente non valido" };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Password non valida" };
        }
        const tokenPayload = {
            id: user.id,
            roles: user.roles,
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        return { success: true, token };
    } catch (error) {
        console.error("Errore durante Login:", error);
        return { success: false, message: "Errore durante il recupero dell'Utente" };
    }
};

/**
 * Retrieves user data based on the provided user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Object} - Returns the user object without password.
 * @throws {Error} - Throws error if user is not found.
 */
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return { success: false, message: "Utente non valido" };
        }
        return { success: true, user };
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return { success: false, message: "Errore nel recupero dell'utente" };
    }
};

module.exports = { registerUser, loginUser, getUserById };
