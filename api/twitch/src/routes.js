const axios = require('axios')

const setupRoute = app => {
    app.get("/user/:token", async (req, res, next) => {
        try {
            const token = req.params.token;

            const result = await axios.get('https://api.twitch.tv/helix/users', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Client-id': 'rkyu7ywqgxxchwqhzk37jgvv1jdx1r'
                }
            });
            return res.json(result.data.data);
        } catch (e) {
            return next(e)
        }
    })
}

module.exports = setupRoute