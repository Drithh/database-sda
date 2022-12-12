# Dataverse

Dataverse is database application about Natural Resources In Indonesia, this application is build with NodeJS, ExpressJS, ReactJS, and PostgreSQL.

## Installation

- git clone https://github.com/drithh/dataverse.git

### Server

- cd server
- npm install
- npm start
- cp .env.example .env
- change the database configuration in `.env` file

### Client

- cd client
- npm install
- npm start
- change the urlLink in `client/src/components/urlLink.js` to your server url (default is `http://localhost:5000`)

### Database

You have to create database in PostgreSQL, and then import the database from `server/sql` folder, from Schema.sql, Insert.sql, and Query.sql
