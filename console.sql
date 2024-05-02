[2024-04-18 23:17:39] Connected
pbtl.public> CREATE TABLE items (
                 item_id SERIAL PRIMARY KEY,
                 ItemName VARCHAR(255) NOT NULL UNIQUE,
                 ItemType VARCHAR(100) NOT NULL,
                 Description TEXT NOT NULL
             )
[2024-04-18 23:34:36] completed in 8 ms
pbtl.public> CREATE TABLE trainers (
                 trainer_id SERIAL PRIMARY KEY,
                 username VARCHAR(255) NOT NULL UNIQUE,
                 first_name VARCHAR(255) NOT NULL,
                 last_name VARCHAR(255) NOT NULL,
                 password VARCHAR(255) NOT NULL,
                 email VARCHAR(255) NOT NULL UNIQUE,
                 phone_number VARCHAR(20) NOT NULL UNIQUE
             )
[2024-04-19 00:03:32] completed in 20 ms
pbtl.public> CREATE TABLE types (
                 type_id SERIAL PRIMARY KEY,
                 type_name VARCHAR(50) UNIQUE NOT NULL
             )
[2024-04-19 00:32:48] completed in 2 ms
pbtl.public> CREATE TABLE pokemon (
                 pokemon_id SERIAL PRIMARY KEY,
                 pokemon_name VARCHAR(100) NOT NULL,
                 type1_id INTEGER NOT NULL,
                 type2_id INTEGER,
                 FOREIGN KEY (type1_id) REFERENCES types (type_id),
                 FOREIGN KEY (type2_id) REFERENCES types (type_id)
             )
[2024-04-19 00:43:48] completed in 5 ms
pbtl.public> CREATE TABLE moves (
                 move_id SERIAL PRIMARY KEY,
                 move_name VARCHAR(255) UNIQUE NOT NULL,
                 power INTEGER,
                 accuracy INTEGER,
                 type_id INTEGER NOT NULL,
                 move_description TEXT NOT NULL,
                 FOREIGN KEY (type_id) REFERENCES types(type_id)
             )
[2024-04-19 01:07:02] completed in 6 ms
pbtl> CREATE TABLE pokemon_moves (
                  pokemon_move_id SERIAL PRIMARY KEY,
                  pokemon_id INTEGER NOT NULL,
                  move_id INTEGER NOT NULL,
                  FOREIGN KEY (pokemon_id) REFERENCES pokemon (pokemon_id),
                  FOREIGN KEY (move_id) REFERENCES moves (move_id)
            )
[2024-04-19 16:26:15] completed in 20 ms
pbtl.public> CREATE TABLE gyms (
                 gym_id SERIAL PRIMARY KEY,
                 gym_name VARCHAR(255) NOT NULL,
                 gym_location VARCHAR(255) NOT NULL
             )
[2024-04-19 16:36:03] completed in 5 ms
pbtl.public> CREATE TABLE badges (
                 badge_id SERIAL PRIMARY KEY,
                 badge_name VARCHAR(255) NOT NULL,
                 type_id INTEGER NOT NULL,
                 badge_description TEXT,
                 FOREIGN KEY (type_id) REFERENCES types (type_id)
             )
[2024-04-19 16:48:11] completed in 17 ms
pbtl.public> CREATE TABLE gym_trainers (
                 gym_trainer_id SERIAL PRIMARY KEY,
                 trainer_id INTEGER NOT NULL,
                 type_id INTEGER NOT NULL,
                 gym_id INTEGER NOT NULL,
                 FOREIGN KEY (trainer_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (type_id) REFERENCES types (type_id),
                 FOREIGN KEY (gym_id) REFERENCES gyms (gym_id)
             )
[2024-04-19 17:38:25] completed in 14 ms
pbtl.public> CREATE TABLE trainer_pokemon (
                 trainer_pokemon_id SERIAL PRIMARY KEY,
                 trainer_id INTEGER NOT NULL,
                 pokemon_id INTEGER NOT NULL,
                 level INTEGER NOT NULL,
                 slot INTEGER NOT NULL,
                 FOREIGN KEY (trainer_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (pokemon_id) REFERENCES pokemon (pokemon_id)
             )
[2024-04-21 15:27:07] completed in 4 ms
pbtl.public> CREATE TABLE pokemon_learned_moves (
                 pokemon_learned_moves_id SERIAL PRIMARY KEY,
                 pokemon_id INTEGER NOT NULL,
                 move_id INTEGER NOT NULL,
                 slot INTEGER NOT NULL,
                 UNIQUE (pokemon_id, move_id, slot),
                 FOREIGN KEY (pokemon_id) REFERENCES pokemon (pokemon_id),
                 FOREIGN KEY (move_id) REFERENCES moves (move_id)
             )
[2024-04-21 15:11:09] completed in 16 ms
pbtl.public> CREATE TABLE battles (
                 battle_id SERIAL PRIMARY KEY,
                 trainer1_id INTEGER NOT NULL,
                 trainer2_id INTEGER NOT NULL,
                 winner_id INTEGER NOT NULL,
                 battle_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                 FOREIGN KEY (trainer1_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (trainer2_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (winner_id) REFERENCES trainers (trainer_id),
                 CONSTRAINT different_trainers CHECK (trainer1_id <> trainer2_id)
             )
[2024-04-21 21:38:40] completed in 12 ms
pbtl.public> CREATE TABLE Events (
                 event_id SERIAL PRIMARY KEY,
                 event_name VARCHAR(255) NOT NULL,
                 start_date DATE NOT NULL,
                 description TEXT NOT NULL
             )
[2024-04-21 23:28:11] completed in 5 ms
pbtl.public> CREATE TABLE trainer_events (
                 trainer_event_id SERIAL PRIMARY KEY,
                 trainer_id INTEGER NOT NULL,
                 event_id INTEGER NOT NULL,
                 UNIQUE (trainer_id, event_id),
                 FOREIGN KEY (trainer_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (event_id) REFERENCES Events (event_id)
             )
[2024-04-24 01:22:23] completed in 5 ms
pbtl.public> CREATE TABLE trainer_badges (
                 trainer_badges_id SERIAL PRIMARY KEY,
                 trainer_id INTEGER NOT NULL,
                 badge_id INTEGER NOT NULL,
                 UNIQUE (trainer_id, badge_id),
                 FOREIGN KEY (trainer_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (badge_id) REFERENCES badges (badge_id)
             )
[2024-04-24 01:22:23] completed in 4 ms
pbtl.public> CREATE TABLE trainer_items (
                 trainer_items_id SERIAL PRIMARY KEY,
                 trainer_id INTEGER NOT NULL,
                 item_id INTEGER NOT NULL,
                 UNIQUE (trainer_id, item_id),
                 FOREIGN KEY (trainer_id) REFERENCES trainers (trainer_id),
                 FOREIGN KEY (item_id) REFERENCES items (item_id)
             )
[2024-04-24 01:22:23] completed in 5 ms
