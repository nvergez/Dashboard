const about = {
    client: {
        host: "localhost"
    },
    server: {
        current_time: "now",
        services: [{
            name: "twitter",
            widgets: [{
                name: "makeATweet",
                description: "Can make a tweet with the connected account",
                params: [{
                    name: "tweet",
                    type: "string"
                }, {
                    name: "auth",
                    type: "string"
                }]
            }, {
                name: "followersCount",
                description: "Display the followers number of the connected account",
                params: [{
                    name: "auth",
                    type: "string"
                }]
            }, {
                name: "lastDM",
                description: "Display the last direct message of the connected account",
                params: [{
                    name: "auth",
                    type: "string"
                }]
            }]
        }, {
            name: "twitch",
            widgets: [{
                name: "viewsCount",
                description: "See the number of views of the connected account",
                params: [{
                    name: "auth",
                    type: "string"
                }]
            }, {
                name: "bestStream",
                description: "See the streamer with the most viewers",
                params: [{
                    name: "auth",
                    type: "string"
                }, {
                    name: "language",
                    type: "string"
                }]
            }, {
                name: "aStream",
                description: "See if a streamer is online, and his viewers count",
                params: [{
                    name: "auth",
                    type: "string"
                }, {
                    name: "username",
                    type: "string"
                }]
            }]
        }, {
            name: "youtube",
            widgets: [{
                name: "videoViews",
                description: "See the views of a video",
                params: [{
                    name: "video_id",
                    type: "string"
                }]
            }, {
                name: "channelSubs",
                description: "See the subscribers number of a channel",
                params: [{
                    name: "channel_id",
                    type: "string"
                }]
            }, {
                name: "lastComment",
                description: "See the last comment of a video",
                params: [{
                    name: "video_id",
                    type: "string"
                }]
            }]
        }]
    }
}

module.exports = about