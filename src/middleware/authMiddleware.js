const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/**
 * Middleware to authenticate requests using JWT stored in cookies.
 * It verifies the token from the request cookies and extracts user data.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

const authMiddleware = (req, res, next) => {
    // Retrieve the token from the cookies
    const token = req.cookies?.token;
    // If no token is provided, deny access
    if (!token) {
        return res.status(401).json({
            message: "Accesso negato. Nessun token fornito.",
        });
    }
    try {
        // Verify the token and decode the user data
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the decoded user data to the request object
        req.user = decoded;
        // Proceed to the next middleware/controller
        next();
    } catch (err) {
        // Handle invalid or expired token errors
        return res.status(403).json({
            message: "Token non valido o scaduto.",
        });
    }
};

module.exports = authMiddleware;
