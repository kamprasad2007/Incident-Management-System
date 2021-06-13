# Incident Management System

This project has 3 main services. Front-end, Backend and database. All these run on individual docker container and docker compose combines all these 3.

## Build Services
    docker-compose build

## Run Services
    docker-compose up

## Access Website
    http://localhost:3000

## Port details
    Front-End   3000
    Backend     4000
    Database    5432

## Build Unit Test Image
    docker-compose -f docker-compose.test.yml build
    
## Run Unit Test
    docker-compose -f docker-compose.test.yml up
    

## More details
[Front-end](front-end/README.md) <br/>
[backend](backend/README.md)  <br/>
[Database](database/README.md) <br/>


## Screens
![Image1](https://i.ibb.co/kgVpn56/Screenshot-2021-06-13-at-10-31-47-PM.png)
![Image1](https://i.ibb.co/Qd2dgST/Screenshot-2021-06-13-at-10-32-05-PM.png)
![Image1](https://i.ibb.co/4ZqWMNw/Screenshot-2021-06-13-at-10-32-18-PM.png)
