const express = require("express");

const router = express.Router();

const authCtrl = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

//================================================================================
// AUTH ROUTES
//================================================================================
router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.get("/me", authMiddleware, authCtrl.me);

module.exports = router;
