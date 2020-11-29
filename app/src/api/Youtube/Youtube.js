var axios = require("axios")

var getDomain = require('../../helpers/getDomain');

async function getVideoStats(id) {
    const res = await axios.get(getDomain() + ':9003/video/views/' + id)
    return res.data;
}

async function getChannelStats(id) {
    const res = await axios.get(getDomain() + ':9003/channel/subs/' + id)
    return res.data;
}

async function getLastComment(id) {
    const res = await axios.get(getDomain() + ':9003/video/comment/' + id)
    return res.data;
}

module.exports = { getVideoStats, getChannelStats, getLastComment };