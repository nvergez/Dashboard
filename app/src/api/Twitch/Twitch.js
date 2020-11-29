var axios = require('axios')

async function getTwitchUsername(token) {
    const res = await axios.get('http://localhost:9001/user/' + token)
    return res.display_name;
}

async function getTwitchViews(token) {
    const res = await axios.get('http://localhost:9001/user/' + token)
    return res.data[0].view_count;
}

async function getBestStream(token, lang = 'en') {
    const res = await axios.get('http://localhost:9001/best_stream/' + token + '?lang=' + lang)
    return res.data
}

async function getStreambyName(token, name) {
    const res = await axios.get('http://localhost:9001/stream/' + token + '?user=' + name)
    return res.data
}

module.exports = {getTwitchUsername, getTwitchViews, getBestStream, getStreambyName};