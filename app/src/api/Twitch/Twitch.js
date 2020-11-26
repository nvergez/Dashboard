var axios = require('axios')

async function getTwitchUsername(token) {
    const res = await axios.get('http://localhost' + ':9001/user/' + token)
    return res.display_name;
}

async function getTwitchViews(token) {
    const res = await axios.get('http://localhost' + ':9001/user/' + token)
    return res.view_count;
}

module.exports = {getTwitchUsername, getTwitchViews};