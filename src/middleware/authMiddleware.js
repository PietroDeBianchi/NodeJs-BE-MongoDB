const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/types/apiReponse.js");

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
    try {
        const token = req.cookies?.token || req.body?.token; // 'req.body?.token' TO DELETE! DEBUG
        if (!token) {
            return res
                .status(401)
                .json(ApiResponse(false, null, "Accesso negato. Nessun token fornito."));
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        if (!req.user.id) {
            return res
                .status(401)
                .json(ApiResponse(false, null, "Accesso negato. Nessun utente trovato."));
        }
        next();
    } catch (err) {
        console.error("Errore autenticazione:", err.message);
        return res.status(403).json(ApiResponse(false, null, "Errore nell'autenticazione."));
    }
};

module.exports = authMiddleware;
