var axios = require('axios')

var getDomain = require('../../helpers/getDomain');

async function createUser(email, password, username) {
        const res = await axios.post(getDomain() + ':9000/users',
        {email: email, username: username, password: password})
        return res.data
}

async function getUser(userId) {
    const res = await axios.get(getDomain() + ':9000/users/' + userId)
    return res.data
}

async function createSession(email, password) {
    const res = await axios.post(getDomain() + ':9000/sessions',
    {email: email, password: password})
    return res.data
}

async function getSession(sessionId) {
    const res = await axios.get(getDomain() + ':9000/sessions/' + sessionId)
    return res.data
}

async function deleteSession(sessionId) {
    const res = await axios.delete(getDomain() + ':9000/sessions/' + sessionId)
    return res.data
}

async function deleteUser(userId) {
    const res = await axios.delete(getDomain() + ':9000/users/' + userId)
    return res.data
}

async function connectImgur(token) {
    const res = await axios.post(getDomain() + ':9000/oauth_imgur/' + token)
    return res.data
}

module.exports = {createUser, createSession, getUser, getSession, connectImgur, deleteUser, deleteSession}