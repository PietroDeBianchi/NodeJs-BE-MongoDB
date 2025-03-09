const User = require("../models/User.js");
const ApiResponse = require("../utils/formats/apiReponse.js");

// ENV Vars
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1d";

/**
 * Retrieves user data based on the provided user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Object} - Returns the user object without password.
 * @throws {Error} - Throws error if user is not found.
 */

const retriveUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return ApiResponse(false, null, "Utenti non trovati o pari a 0");
        }
        return res.json(ApiResponse(true, users, "Lista utenti recuperata con successo"));
    } catch (error) {
        console.error("Errore durante il recupero degli utenti:", error);
        return ApiResponse(false, null, "Errore nel recupero degli utenti");
    }
};

const updateNewUser = async (userId, updateFields) => {
    try {
        if (Object.keys(updateFields).length === 0) {
            return ApiResponse(false, null, "Nessun dato fornito per l'aggiornamento");
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return ApiResponse(false, null, "utent non trovato");
        }
        return ApiResponse(true, null, "Utente aggiornato con successo");
    } catch (error) {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        return ApiResponse(false, null, "Errore durante l'aggiornamento dell'utente");
    }
};

const deleteExistingUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return ApiResponse(false, null, "utent non trovato");
        }
        return ApiResponse(true, null, "Utente eliminato con successo");
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return ApiResponse(false, null, "Errore nel recupero dell'utente");
    }
};

module.exports = { retriveUsers, updateNewUser, deleteExistingUser };
