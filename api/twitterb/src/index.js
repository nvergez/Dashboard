const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const setupRoute = require("./routes")

const PORT = 9002

const app = express()

app.use(bodyParser.json());

app.use(cors())

setupRoute(app);

app.listen(PORT, "0.0.0.0", () => {
    console.info(`Twitter service listening on ${PORT}`);
})