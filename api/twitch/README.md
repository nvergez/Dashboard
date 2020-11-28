# Twitter API

This microservice use nodeJS as langage.

## Routes
---
### URL  
`http://localhost:9002`  

---
### Get User infos

Create a new user in the database. You optain the userId in return.

Request type: `GET`  

URL: `/user/:token`  

Return:
```
{
    Object
}
```
---
### Get greatest Stream

You have to put the userId in parameter, if exists you optain all user informations.

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

Delete current user with the userId in parameter.

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
