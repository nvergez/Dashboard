# Twitter API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9002`  

---
### Get followers count 

Create a new user in the database. You optain the userId in return.

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

You have to put the userId in parameter, if exists you optain all user informations.

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

Delete current user with the userId in parameter.

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
