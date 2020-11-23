const axios = require("axios")

function getUrlTwitch() {
    return "https://id.twitch.tv/oauth2/authorize?client_id=rkyu7ywqgxxchwqhzk37jgvv1jdx1r&response_type=token&redirect_uri=http://localhost/oauth_twitch"
}

module.exports = { getUrlTwitch };