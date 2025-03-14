const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {getUsers, updateUser, deleteUser} = require("../controllers/userController");

//================================================================================
// USER ROUTES
//================================================================================
router.get("/", authMiddleware, getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;