const { registerUser, loginUser, getUserById } = require("../helpers/authHelper");
const ApiResponse = require("../utils/types/apiReponse.js");

/**
 * Controller for user registration.
 * It validates input, calls the helper function to create a new user,
 * and sends a response with user details (excluding the password).
 *
 * @param {Object} req - Express request object (contains user data in req.body).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, roles, phone } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json(ApiResponse(false, null, "Tutti i campi obbligatori devono essere forniti"));
        }
        const result = await registerUser(email, password, firstName, lastName, roles, phone);
        if (!result.success) {
            return res.status(400).json(result);
        }
        return res.status(201).json(result);
    } catch (error) {
        console.error("Errore registrazione:", error);
        return res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};
/**
 * Controller for user login.
 * It checks user credentials, generates a JWT token if valid,
 * and sends the token along with user details.
 *
 * @param {Object} req - Express request object (contains email and password in req.body).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json(ApiResponse(false, null, "Tutti i campi obbligatori devono essere forniti"));
        }
        const result = await loginUser(email, password);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.cookie("token", result.data, {
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 1d
            // secure: process.env.NODE_ENV === "production", // Only HTTPS  in production
        });
        res.status(200).json(ApiResponse(result.success, result.data, result.message)); // 'result.data' TO SET null! DEBUG
    } catch (error) {
        console.error("Errore login:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};
/**
 * Controller to retrieve authenticated user details.
 * It uses the user ID from the decoded JWT token to fetch user data.
 *
 * @param {Object} req - Express request object (contains user ID in req.user).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const me = async (req, res) => {
    try {
        const result = await getUserById(req.user.id);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

module.exports = { register, login, me };
