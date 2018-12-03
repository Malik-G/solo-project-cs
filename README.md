# CardSwap
This website, cardSwap, was made to be an extension of an already exisiting e-commerce website, [cardsawaysports](https://www.cardsawaysports.com/). CardSwap attempts to address the issue of having a reliable and verifiable online source for collectors to find, post, trade, or purchase quality sports cards.

## Download (Don't Clone) This Repository
* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Technologies Used
* Javascript
* Node.js
* Express.js
* Passport.js
* React w/ Redux and Sagas
* Material-UI
* HTML/CSS
* Look at the `package.json` file to see the full list of dependencies for this application.

## Create database and tables
Create a new database called `card_swap` and create the tables `user_auth`, `user_info`, `card_info`, and `watch_list`:

```SQL
CREATE TABLE "user_auth" (
   "id" SERIAL PRIMARY KEY,
   "username" VARCHAR (50) UNIQUE NOT NULL,
   "password" VARCHAR (100) NOT NULL
);

CREATE TABLE "user_info" (
   "user_id" INT REFERENCES user_auth,
   "street" VARCHAR (100) NOT NULL,
   "city" VARCHAR (100) NOT NULL,
   "state" VARCHAR (100) NOT NULL,
   "zip" VARCHAR (20) NOT NULL,
   "phone" VARCHAR (20) NOT NULL,
   "email" VARCHAR (100)
);

CREATE TABLE "card_info" (
   "card_id" SERIAL PRIMARY KEY,
   "user_id" INT REFERENCES user_auth,
   "sport" VARCHAR (50) NOT NULL,
   "athlete" VARCHAR (100) NOT NULL,
   "team" VARCHAR (100) NOT NULL,
   "card_brand" VARCHAR (100) NOT NULL,
   "trade_block" BOOLEAN NOT NULL,
   "price" VARCHAR (20),
   "details" VARCHAR (1000),
   "image_url" VARCHAR (300),
   "date" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "watch_list" (
   "watch_list_id" SERIAL PRIMARY KEY,
   "watch_list_owner" INT REFERENCES user_auth NOT NULL,
   "id_of_card" INT REFERENCES card_info
);
```

If you would like to name your database something else, you will need to change `card_swap` to the name of your new database name in `server/modules/pool.js`. Test data for these tables are included in the `database.sql` file.

## Development Setup Instructions
* Run `npm install`.
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is heavily commented. I recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

## Deployment
1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

