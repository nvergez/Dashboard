# Youtube API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9003`  

---
### Get video info by Id

Give some infos about a video by video id.

Request type: `GET`  

URL: `/video/views/:id`  

Return:
```
{
    title: "titre",
    channel: "machaine",
    statistics: {
        "viewCount": "324720",
        "likeCount": "8450",
        "dislikeCount": "228",
        "favoriteCount": "0",
        "commentCount": "151"
    }
}
```
---
### Get subscribers count by id

Give some infos about channel by channel id.

Request type: `GET`  

URL: `/channel/subs/:id`


Return:
```
{
    "channel": "Iain Hemstock",
    "statistics": {
        "viewCount": "39026929",
        "subscriberCount": "52700",
        "hiddenSubscriberCount": false,
        "videoCount": "75"
    }
}
```

---
### Get last comment by video id

Get the last comment of a video by video id.

Request type: `GET`  

URL: `/video/comment/:id`  

Return:
```
{
    "channel": "Solís Music",
    "comment": "'But you heard it, darling, you look perfect tonight..'"
}
```

## Author
---
- Nicolas Vergez
