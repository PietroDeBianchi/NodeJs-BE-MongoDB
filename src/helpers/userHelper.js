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
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return ApiResponse(false, null, "Errore nel recupero dell'utente");
    }
};
const createNewUser = async (userId) => {
    try {
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return ApiResponse(false, null, "Errore nel recupero dell'utente");
    }
};
const updateNewUser = async (userId) => {
    try {
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return ApiResponse(false, null, "Errore nel recupero dell'utente");
    }
};
const deleteExistingUser = async (userId) => {
    try {
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return ApiResponse(false, null, "Errore nel recupero dell'utente");
    }
};

module.exports = { retriveUsers, createNewUser, updateNewUser, deleteExistingUser };
