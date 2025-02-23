// REQUIRES PACKAGE
require('dotenv').config();
const colors = require("colors");
// REQUIRES IMPORTS
const app = require('./config/express');
const connectDB = require("./config/database");
const getETFData = require("../src/services/marketStackService.JS")

// CONST
const PORT = process.env.PORT || 3000;
const PROJECT_NAME = process.env.PROJECT_NAME || 'TEST';

// TEST
const mostraDatiETF = async () => {
    const result = await getETFData.getETFData({
        symbol: 'AAPL',
        date_from: '2025-01-01',
        date_to: '2025-02-01',
    });

    if (result.success) {
        console.log('Dati ETF:', result.data);
    } else {
        console.error('Errore:', result.message);
    }
};

// START
const logStartupMessage = async () => {
    console.log("=".repeat(50).blue);
    console.log(`🚀 Project: ${PROJECT_NAME}`.green);
    console.log(`🌐 Server running on port: ${PORT}`.green);
    try {
        await connectDB(); // Connect to MongoDB
        await mostraDatiETF(); // TEST
    } catch (err) {
        console.error(`❌ ${err}`.red);
    }
    console.log("=".repeat(50).blue);
};

// Start the server
app.listen(PORT, () => {
    logStartupMessage();
});