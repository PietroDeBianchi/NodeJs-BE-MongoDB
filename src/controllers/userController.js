const ApiResponse = require("../utils/types/apiReponse.js");
const { retriveUsers, updateNewUser, deleteExistingUser } = require("../helpers/userHelper.js");

/**
 * Controller to retrieve authenticated user details.
 * It uses the user ID from the decoded JWT token to fetch user data.
 *
 * @param {Object} req - Express request object (contains user in req.user).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getUsers = async (res) => {
    try {
        const result = await retriveUsers();
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const userId = req.params.id; // add '|| req.user.id'
        if (!userId) {
            return res.status(400).json(ApiResponse(false, null, "ID Utente non trovato"));
        }
        const result = await updateNewUser(userId, { firstName, lastName, email, phone });
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // add '|| req.user.id'
        if (!userId) {
            return res.status(400).json(ApiResponse(false, null, "ID Utente non trovato"));
        }
        const result = await deleteExistingUser(userId);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

module.exports = { getUsers, updateUser, deleteUser };
