var axios = require("axios")


var getDomain = require('../../helpers/getDomain');


async function getFollowersCount(token, secret) {
    const res = await axios.get(getDomain() + ':9002/followers/count?token=' + token + '&secret=' + secret)
    /*if (res.data[0].message)
        return -1
    else*/
        return res.data.count
}

async function newTweet(token, secret, tweet) {
    const res = await axios.post(getDomain() + ':9002/tweet?token=' + token + '&secret=' + secret,
    {tweet: tweet})
    if (res.data.status === "OK") {
        return true;
    } else {
        return false;
    }
}

async function getLastDm(token, secret) {
    const res = await axios.get(getDomain() + ':9002/dm/last?token=' + token + '&secret=' + secret)
    /*if (res.data[0].message)
        return -1
    else*/
        return res.data.message
}


module.exports = { getFollowersCount, newTweet, getLastDm}