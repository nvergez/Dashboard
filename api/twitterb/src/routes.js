const axios = require('axios')

const twitter = require('twitter')

const twitter_consumer_key = 'alNDFDcvK4g3lW965J1udkqmA'
const twitter_consumer_secret = 'WoUhrTEa68fw1i5NEjrnPOZHYWHmxvc9WcHKGgvRnCrhewqpP3'

const setupRoute = app => {
    app.get("/followers/count", async (req, res, next) => {
        try {
            const key = req.query.token;
            const secret = req.query.secret;

            var result;

            var client = new twitter({
                consumer_key: twitter_consumer_key,
                consumer_secret: twitter_consumer_secret,
                access_token_key: key,
                access_token_secret: secret
            })
            client.get('followers/ids', function(error, followers, response) {
                if(error) throw error;
                result = {count: followers.ids.length};
                return res.json(result);
              });
        } catch (e) {
            return next(e)
        }
    });

    app.post("/tweet", async (req, res, next) => {
        try {
            const key = req.query.token;
            const secret = req.query.secret;
            const tweet = req.body.tweet;

            var result;

            var client = new twitter({
                consumer_key: twitter_consumer_key,
                consumer_secret: twitter_consumer_secret,
                access_token_key: key,
                access_token_secret: secret
            })
            client.post('statuses/update', {status: tweet})
            .then(function (tweet) {
                return res.json({status: "OK"});
            })
            .catch(function (error) {
                throw error;
            })
        } catch (e) {
            return next(e)
        }
    });

    app.get("/dm/last", async (req, res, next) => {
        try {
            const key = req.query.token;
            const secret = req.query.secret;

            var result;

            var client = new twitter({
                consumer_key: twitter_consumer_key,
                consumer_secret: twitter_consumer_secret,
                access_token_key: key,
                access_token_secret: secret
            })
            client.get('direct_messages/events/list', function(error, dms, response) {
                if(error) throw error;
                result = {message: dms.events[0].message_create.message_data.text};
                //console.log(dms);
                return res.json(result);
              });
        } catch (e) {
            return next(e)
        }
    });
}

module.exports = setupRoute