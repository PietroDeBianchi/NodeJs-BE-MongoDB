const { registerUser, loginUser, getUserById } = require("../helpers/authHelper");

/**
 * Controller for user registration.
 * It validates input, calls the helper function to create a new user,
 * and sends a response with user details (excluding the password).
 *
 * @param {Object} req - Express request object (contains user data in req.body).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const register = async (req, res, next) => {
    try {
        const result = await registerUser(req.body);
        
        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json({
            success: true,
            message: "Utente creato correttamente",
        });
    } catch (error) {
        console.error("Errore registrazione:", error);
        res.status(500).json({
            success: false,
            message: "Errore interno del server",
        });
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
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.cookie("token", result.token, {
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 1d
            // secure: process.env.NODE_ENV === "production", // Only HTTPS  in production
        });
        res.status(200).json({
            success: true,
            message: "Login effettuato con successo",
        });
    } catch (error) {
        console.error("Errore login:", error);
        res.status(500).json({
            success: false,
            message: "Errore interno del server",
        });
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
const me = async (req, res, next) => {
    try {
        const result = await getUserById(req.user.id);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({
            success: true,
            user: result.user,
        });
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json({
            success: false,
            message: "Errore interno del server",
        });
    }
};

module.exports = { register, login, me };
