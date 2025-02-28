const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const routes = require("../routes/index.js");

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.enable("trust proxy");

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({ credentials: true, origin: true }));

// enable Cookies Parser
app.use(cookieParser());

// mount api routes
app.use("/api", routes);

// Middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage =
        statusCode === 500 && process.env.NODE_ENV === "production"
            ? "Errore interno del server"
            : err.message;
    res.status(statusCode).json({
        status: statusCode,
        message: errorMessage,
    });
});

module.exports = app;
