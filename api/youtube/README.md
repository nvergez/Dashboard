# Youtube API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9003`  

---
### Get video info by Id

Create a new user in the database. You optain the userId in return.

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

You have to put the userId in parameter, if exists you optain all user informations.

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

Delete current user with the userId in parameter.

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
