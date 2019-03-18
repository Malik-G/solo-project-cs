CREATE TABLE "user_auth" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (50) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);

--tests
--SELECT username FROM user_auth WHERE id=1;
--DELETE FROM user_auth WHERE id=5;

---------------------------------------

CREATE TABLE "user_info" (
    "user_id" INT REFERENCES user_auth,
    "street" VARCHAR (100) NOT NULL,
    "city" VARCHAR (100) NOT NULL,
    "state" VARCHAR (100) NOT NULL,
    "zip" VARCHAR (20) NOT NULL,
    "phone" VARCHAR (20) NOT NULL,
    "email" VARCHAR (100)
);


--test inserts
--INSERT INTO user_info (user_id, street, city, state, zip, phone, email)
--VALUES (1, '301 S. 4th Ave', 'Minneapolis', 'MN', '55415', '651-555-4321', 'malik1@gmail.com');

--INSERT INTO user_info (user_id, street, city, state, zip, phone, email)
--VALUES (2, '103 N. 8th St.', 'Saint Paul', 'MN', '55117', '651-444-5432', 'malik2@gmail.com');

--VIEW
--SELECT ua.id, ua.username, COUNT(ci.card_id)
FROM user_auth as ua JOIN card_info as ci ON ua.id = ci.user_id
GROUP BY ua.username, ua.id;



---------------------------------------

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

--test inserts
INSERT INTO card_info (user_id, sport, athlete, team, card_brand, trade_block, price, details, image_url)
VALUES (1, 'Basketball', 'Russell Westbrook', 'Oklahoma City Thunder', 'Donruss', true, '5.00', 'This card is in VERY good condition', 'https://firebasestorage.googleapis.com/v0/b/card-swap-72684.appspot.com/o/images%2FRussell-Westbrook-.jpg?alt=media&token=2e75f5a1-d43d-48fd-8107-ce992f7079c5');

INSERT INTO card_info (user_id, sport, athlete, team, card_brand, trade_block, price, details, image_url)
VALUES (1, 'Football', 'Antonio Brown', 'Pittsburgh Steelers', 'Donruss', true, '10.00', 'Perfect for any AB fan! Good Condition', 'https://firebasestorage.googleapis.com/v0/b/card-swap-72684.appspot.com/o/images%2Fabrown.jpg?alt=media&token=d81b744e-6d35-4c01-8251-1d687b89fba1');

INSERT INTO card_info (user_id, sport, athlete, team, card_brand, trade_block, price, details, image_url)
VALUES (2, 'Baseball', 'Kirby Puckett', 'Minnesota Twins', 'Panini/Donruss', false, 'Not For Sale', 'Look, no buy!', 'https://firebasestorage.googleapis.com/v0/b/card-swap-72684.appspot.com/o/images%2Fkpuckett.jpg?alt=media&token=890bf89d-8fa5-474e-9d8e-3ebf98a9c2d4');

INSERT INTO card_info (user_id, sport, athlete, team, card_brand, trade_block, price, details, image_url)
VALUES (2, 'Baseball', 'Bryce Harper', 'Team USA Baseball', 'Panini', true, '8.00', 'Young Bryce before the stardom. In great condition.', 'https://firebasestorage.googleapis.com/v0/b/card-swap-72684.appspot.com/o/images%2Fharperusa.jpg?alt=media&token=d59a0a7f-e407-4b4e-96a2-bce9f361616b');

---------------------------------------

CREATE TABLE top_cards (
	card_id INT REFERENCES card_info,
	user_id INT REFERENCES user_auth,
	top_card1_athlete VARCHAR NOT NULL,
	top_card1_team VARCHAR NOT NULL,
	top_card2_athlete VARCHAR NOT NULL,
	top_card2_team VARCHAR NOT NULL
);

---------------------------------------

CREATE TABLE watch_list (
	"watch_list_id" SERIAL PRIMARY KEY,
	"watch_list_owner" INT REFERENCES user_auth NOT NULL,
	"id_of_card" INT REFERENCES card_info
);


--test insert
INSERT INTO watch_list (watch_list_owner, id_of_card)
VALUES (2, 1);

--VIEW
SELECT wl.watch_list_owner, wl.watch_list_id, ua.username as card_owner, ci.*
FROM watch_list as wl 
JOIN card_info as ci ON ci.card_id=wl.id_of_card
JOIN user_auth as ua ON ua.id=ci.user_id
WHERE wl.watch_list_owner=1;

---------------------------------------

CREATE TABLE messages (
	"message_id" SERIAL PRIMARY KEY,
	"date_sent" TIMESTAMP DEFAULT NOW(),
	"sender" VARCHAR REFERENCES user_auth(username),
	"receiver" VARCHAR REFERENCES user_auth(username),
	"message" VARCHAR (1000),
	"draft" BOOLEAN DEFAULT true,
	"checked" BOOLEAN DEFAULT false
);

---------------------------------------

CREATE TABLE conversations (
	"convo_id" SERIAL,
	"message_id" INT REFERENCES messages (message_id),
	"last_updated" TIMESTAMP DEFAULT NOW()
);

---------------------------------------

--starter test data, insert in this order
INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('malik', 'CardCrazy23', 'Hey whats up?', false, true);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('CardCrazy23', 'malik', 'Not much. Want to trade cards?', false, true);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('malik', 'CardCrazy23', 'Yeah, I got a Kevin Garnett joint that I havent put on the site yet.', false, true);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('malik', 'malik2', 'Im posting a Kevin Garnett card tonight, be on the look out!!, ', false, true);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('malik2', 'malik', 'Ok, thanks for letting me know., ', false, false);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('CardCrazy23', 'malik', 'How much and from what year?', false, true);

INSERT INTO messages(sender, receiver, message, draft, checked)
VALUES ('malik', 'CardCrazy23', '$40...1999 panini...Ill post it tonight', false, false);


--starter test data, insert in this order
INSERT INTO conversations(convo_id, message_id)
VALUES (1, 1);

INSERT INTO conversations(convo_id, message_id)
VALUES (1, 2);

INSERT INTO conversations(convo_id, message_id)
VALUES (1, 3);

INSERT INTO conversations(convo_id, message_id)
VALUES (2, 4);

INSERT INTO conversations(convo_id, message_id)
VALUES (2, 5);

INSERT INTO conversations(convo_id, message_id)
VALUES (1, 6);

INSERT INTO conversations(convo_id, message_id)
VALUES (1, 7);

---------------------------------------

--CONVERSATIONS View
SELECT c.convo_id, c.last_updated, m.message, m.sender, m.receiver
FROM messages as m JOIN conversations as c
ON m.message_id=c.message_id
WHERE sender='malik' OR receiver='mailk'
ORDER BY c.last_updated DESC;

--SEND MESSAGE View
SELECT * FROM messages WHERE sender='malik';

--DRAFTS View
SELECT * FROM messages WHERE sender='malik' AND draft=true ORDER BY date_sent;

---------------------------------------

--CONVERSATIONS user clicks--
	--message click

	--delete click
	--TBD


---SEND MESSAGE user clicks--
	--'send' click:
	--INSERT INTO messages(sender, receiver, message, draft)
	--VALUES ('$1', '$2', '$3', false);

	--INSERT INTO conversations(message_id)
	--VALUES ($1);
	
	--'save as draft' click:
	--INSERT INTO messages(sender, receiver, message)
	--VALUES ('$1', '$2', '$3');


---DRAFTS user clicks--
	--'send' click
	--UPDATE messages SET date_sent=NOW(), message=$1, draft=false WHERE message_id=$2
	
	--'discard' click
	--DELETE FROM messages WHERE message_id=$1