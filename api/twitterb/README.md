# Twitter API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9002`  

---
### Get followers count 

Get the follower count of the account corresponding to the tokens. You optain the count in return.

Request type: `GET`  

URL: `/followers/count`  

Queries: 
```
token,
secret
```

Return:
```
{
    count: 44
}
```
---
### Post a tweet 

Post a tweet with the account corresponding to the given tokens. Return OK|KO.

Request type: `POST`  

URL: `/tweet`

Queries: 
```
token,
secret
```

BODY:
```
{
    tweet: "Hello"
}
```

Return:
```
{
    status: "OK"
}
```

---
### Get last DM

Get the last direct message of the account correponding to the given tokens. Return the message.

Request type: `GET`  

URL: `/dm/last`  

Queries: 
```
token,
secret
```

BODY: `null` 

Return:
```
{
    message: "Hello"
}
```

## Author
---
- Nicolas Vergez
