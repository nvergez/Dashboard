# Authentication API

This microservice use nodeJS as langage and MySQL for the database.

## Routes
---
### URL  
`http://localhost:9000`  

---
### Create a new user  

Create a new user in the database. You optain the userId in return.

Request type: `POST`  

URL: `/users`  

BODY: 
```
{
    "email": "email@example.com"
    "username": "Lucas"
    "password": "monmdp"
} 
```
---
### Get infos user by id  

You have to put the userId in parameter, if exists you optain all user informations.

Request type: `GET`  

URL: `/users/:userId`  

BODY: `null`  

---
### Login a user and create session  

Create a session for existing user with email and password. Return sessionId.

Request type: `POST`  

URL: `/sessions`  

BODY:
```
{
    "email": "email@example.com"
    "password": "monmdp"
}
```
---
### Logout user and delete session  

Delete current session with the sessionId in parameter.

Request type: `DELETE`  

URL: `/sessions/:sessionId`  

BODY: `null`  

---
### Get infos about current session  

Give more informations about current session with the sessionId in parameter.

Request type: `GET`  

URL: `/sessions/:sessionId`  

BODY: `null`  

## Author
---
- Nicolas Vergez
