var about = require("./model")
const moment = require("moment")

const setupRoute = app => {
    app.get("/about.json", (req, res) => {
        about.client.host = req.ip
        about.server.current_time = moment().unix()
        res.set('Content-Type', 'application/json');
        res.end(JSON.stringify(about, null, 4));
    })
}

module.exports = setupRoute