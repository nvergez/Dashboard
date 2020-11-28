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

    app.get("/best_stream/:token", async (req, res, next) => {
        try {
            const token = req.params.token;
            const lang = req.query.lang;

            if (lang === "fr") {
                const result = await axios.get('https://api.twitch.tv/helix/streams?first=1&language=fr', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Client-id': 'rkyu7ywqgxxchwqhzk37jgvv1jdx1r'
                    }
                });
                return res.json(result.data.data[0]);
            } else {
                const result = await axios.get('https://api.twitch.tv/helix/streams?first=1', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Client-id': 'rkyu7ywqgxxchwqhzk37jgvv1jdx1r'
                    }
                });
                return res.json(result.data.data[0]);
            }
        } catch (e) {
            return next(e)
        }
    })

    app.get("/stream/:token", async (req, res, next) => {
        try {
            const token = req.params.token;
            const stream = req.query.user;

            const result = await axios.get('https://api.twitch.tv/helix/streams?user_login=' + stream, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Client-id': 'rkyu7ywqgxxchwqhzk37jgvv1jdx1r'
                }
            });
            if (result.data.data[0])
                return res.json(result.data.data[0]);
            else
                return res.json({offline: true});
        } catch (e) {
            return next(e)
        }
    })
}

module.exports = setupRoute