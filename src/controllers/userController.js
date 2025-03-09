const ApiResponse = require("../utils/formats/apiReponse.js");
const { retriveUsers, updateNewUser, deleteExistingUser } = require("../helpers/userHelper.js");

/**
 * Controller to retrieve authenticated user details.
 * It uses the user ID from the decoded JWT token to fetch user data.
 *
 * @param {Object} req - Express request object (contains user in req.user).
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getUsers = async (req, res, next) => {
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

const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const result = await updateNewUser(req.user.id, { firstName, lastName, email, phone });
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const result = await deleteExistingUser(req.user.id);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Errore nel recupero dati utente:", error);
        res.status(500).json(ApiResponse(false, null, "Errore interno del server"));
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
