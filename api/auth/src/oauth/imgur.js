const axios = require("axios")

async function getImgurAccount(token) {
    const res = await axios.get("https://api.imgur.com/3/account/me/settings", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res.data
}

module.exports = getImgurAccount;