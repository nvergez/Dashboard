const axios = require("axios")

function getUrlImgur() {
    var id = '';

    if (process.env.DEPLOY_ENV === "TRUE") {
        id = '80349a8d6eea645';
    } else {
        id = '510b034631f364b';
    }
    return "https://api.imgur.com/oauth2/authorize?client_id=" + id + "&response_type=token";
}

async function getImgurAccount(token) {
    const res = await axios.get("https://api.imgur.com/3/account/me/settings", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res.data
}

module.exports = {getUrlImgur, getImgurAccount};