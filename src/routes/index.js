const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoute');
const userRoute = require('./userRoute');

//========================================
// AUTH ROUTES
router.use('/v1/auth', authRoutes);
router.use('/v1/users', userRoute);

module.exports = router;
