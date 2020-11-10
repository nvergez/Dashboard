const about = {
    client: {
        host: "localhost"
    },
    server: {
        current_time: "now",
        services: [{
            name: "twitter",
            widgets: [{
                name: "tweet_something",
                description: "Can tweet a tweet",
                params: [{
                    auth: "link"
                }]
            }]
        }, {
            name: "twitch",
            widgets: [{
                name: "viewers_number",
                description: "See your number of viewers",
                params: [{
                    auth: "link"
                }]
            }]
        }]
    }
}

module.exports = about