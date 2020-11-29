# Twitch API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9001`  

---
### Get User infos

Get basics infos about the user corresponding to the given token. Return the infos

Request type: `GET`  

URL: `/user/:token`  

Return:
```
{
    Object
}
```
---
### Get best Stream

Get the stream with the most viewers. Can precise language. Return the stream.

Request type: `GET`  

URL: `/best_stream/:token`

Query:
{
    lang="fr"
}


Return:
```
{
    Object
}
```

---
### Get stream by username

Get current stream infos of a user, by username.

Request type: `GET`  

URL: `/stream/:token`  

Queries: 
```
user
```

BODY: `null` 

Return:
```
{
    Object || offline
}
```

## Author
---
- Nicolas Vergez
