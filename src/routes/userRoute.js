const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {getUsers, createUser, updateUser, deleteUser} = require("../controllers/userController");

//================================================================================
// USER ROUTES
//================================================================================
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

module.exports = router;
