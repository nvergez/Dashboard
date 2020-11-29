var Youtube = require('youtube-node')
const axios = require('axios')

var youtube = new Youtube();

youtube.setKey('AIzaSyDToqt-akdmMeLk7yVIMHKcdLyQx1MvZN0');

var key = 'AIzaSyDToqt-akdmMeLk7yVIMHKcdLyQx1MvZN0'

const setupRoute = app => {
    app.get("/video/views/:id", async (req, res, next) => {
        try {
            const id = req.params.id;

            youtube.getById(id, function(error, result) {
                if (error) {
                  console.log(error);
                }
                else {
                    if (result.pageInfo.totalResults == 0) {
                        return res.json({wrongId: true});
                    } else {
                        return res.json({title: result.items[0].snippet.title, channel: result.items[0].snippet.channelTitle, statistics: result.items[0].statistics})
                    }
                }
              });
        } catch (e) {
            return next(e)
        }
    })

    app.get("/video/comment/:id", async (req, res, next) => {
        try {
            const id = req.params.id;

            const result = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads?key=' + key + '&part=snippet&maxResults=1&videoId=' + id);

            if (result.status !== 200) {
                return res.json({wrongId: true});
            }

            if (result.data.pageInfo.totalResults == 0) {
                return res.json({wrongId: true});
            } else {
                return res.json({channel: result.data.items[0].snippet.topLevelComment.snippet.authorDisplayName, comment: result.data.items[0].snippet.topLevelComment.snippet.textOriginal})
            }
        } catch (e) {
            return res.json({wrongId: true}) 
        }
    })

    app.get("/channel/subs/:id", async (req, res, next) => {
        try {
            const id = req.params.id;

            youtube.getChannelById(id, function(error, result) {
                if (error) {
                  console.log(error);
                }
                else {
                    if (result.pageInfo.totalResults == 0) {
                        return res.json({wrongId: true});
                    } else {
                        return res.json({channel: result.items[0].snippet.title, statistics: result.items[0].statistics})
                    }
                }
              });
        } catch (e) {
            return next(e)
        }
    })
}

module.exports = setupRoute