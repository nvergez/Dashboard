var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");

var accessEnv = require("../helpers/accessEnv");
var setupRoutes = require("./routes");

const PORT = accessEnv.accessEnv("PORT", 9000);

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

setupRoutes.setupRoutes(app);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`Auth service listening on ${PORT}`);
});