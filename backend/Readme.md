# Backend Server for taskmanager application

- Express.js, Typescript

## there are two environment files

- .env.development
  - PORT
  - DATABASE_URL
  - JWT_SECRET
- .env.production
  - PORT
  - DATABASE_URL
  - JWT_SECRET

- set the variables accroding to your needs.

- In our case, database hosted on IPV6 network, and backend node app is hosted in IPV4 network. our development environment is on IPV6 network. so, the DATABASE_URL will be different for development and production in our case.

- use a strong JWT_SECRET in production.
