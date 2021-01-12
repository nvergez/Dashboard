# Dashboard

This project is an implementation of a web application that works like Netvibes.

We chose a microservices architecture for this project because it offers increased modularity, making applications easier to develop, test, deploy, and, more importantly, change and maintain.
We chose ReactJS for the frontend service and all the others uses nodeJS.

---
## Build and run the project
```
> docker-compose build   /* For build the project */
> docker-compose up      /* For run the project */
```
You can access to the main application (frontend) at http://localhost.

---
## Services & Widgets
- Twitter (Authentication needed)
  - Follower count
  - Make a tweet
  - Display last direct message
- Twitch (Authentication needed)
  - Views count
  - Display the stream with the most viewers
  - Display infos about a stream
- Youtube
  - Views count of a video
  - Followers count of a channel
  - Display last comment of a video
---
## Documentation 
### APIs
- [Authentication service](api/auth)
- [Twitter service](api/twitterb)
- [Twitch service](api/twitch)
- [Youtube service](api/youtube)
### Graphical
- [Graphical charter](documentation/charte_graphique_Dashboard.pdf)
### Technical
- [Architecture](documentation/microservice_architecture.pdf)
---
## Authors
- Nicolas Vergez
- Maxime Geider
