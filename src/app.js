// REQUIRES PACKAGE
require('dotenv').config();
const colors = require("colors");
// REQUIRES IMPORTS
const app = require('./config/express');
const connectDB = require("./config/database");

// CONST
const PORT = process.env.PORT || 3000;
const PROJECT_NAME = process.env.PROJECT_NAME || 'TEST';

// LOAD MESSAGE & FUNCTIONS
const logStartupMessage = async () => {
    console.log("=".repeat(50).blue);
    console.log(`🚀 Project: ${PROJECT_NAME}`.green);
    console.log(`🌐 Server running on port: ${PORT}`.green);
    try {
        await connectDB(); // Connect to MongoDB
    } catch (err) {
        console.error(`❌ ${err}`.red);
    }
    console.log("=".repeat(50).blue);
};

// START THE SERVER
app.listen(PORT, () => {
    logStartupMessage();
});