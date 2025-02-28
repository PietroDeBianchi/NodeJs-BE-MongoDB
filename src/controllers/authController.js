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
        // Call helper function to register a new user
        const userResponse = await registerUser(req.body);

        // Send success response with user details
        res.status(201).json({
            success: true,
            message: "Utente creato correttamente",
            data: userResponse,
            count: 1,
        });
    } catch (error) {
        console.error("Errore registrazione:", error);
        // Return a 400 error if user creation fails (e.g., email already in use)
        res.status(400).json({ success: false, message: error.message });
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

        // Call helper function to authenticate user and get JWT token
        const { token, user } = await loginUser(email, password);

        // Set the token in a secure HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side JavaScript
            // secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "Strict", // Prevents CSRF attacks
            maxAge: 3600000, // 1 hour expiration
        });

        // Send success response without exposing the token
        res.status(200).json({
            success: true,
            message: "Login effettuato con successo",
            user, // Send user details but no token
        });
    } catch (error) {
        console.error("Errore login:", error);
        res.status(400).json({ success: false, message: error.message });
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
        // Fetch user details using the ID extracted from the authenticated request
        const user = await getUserById(req.user.id);
        // Send success response with user data
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        // Return a 400 error if user is not found
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, me };
