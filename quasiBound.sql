
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name_user" varchar,
  "id_link" varchar,
  "lang" varchar,
  "count_rating" int,
  "total_win" int,
  "total_games" int,
  "thumbnail" varchar,
  "count_collection" int,
  "created_at" date
);

CREATE TABLE "user_deck" (
  "id_deck" int,
  "id_user" int
);

CREATE TABLE "deck" (
  "id" SERIAL PRIMARY KEY,
  "count_card" int,
  "title" varchar
);

CREATE TABLE "deck_card" (
  "id_card" int,
  "id_deck" int
);

CREATE TABLE "card" (
  "id" SERIAL PRIMARY KEY,
  "point_resource" int,
  "thumbnail" varchar,
  "description" varchar,
  "point_attack" int,
  "point_defence" int,
  "point_armor" int,
  "is_character" boolean,
  "size" varchar
);

CREATE TABLE "card_attribute" (
  "id_card" int,
  "id_attribute" int
);

CREATE TABLE "attribute" (
  "id" SERIAL PRIMARY KEY,
  "is_flying" boolean,
  "is_magical" boolean,
  "has_lifesteal" boolean,
  "is_sneaky" boolean,
  "has_provoke" boolean
);

CREATE TABLE "leaderboard" (
  "id" SERIAL PRIMARY KEY,
  "id_user" int
);

ALTER TABLE "card_attribute" ADD FOREIGN KEY ("id_card") REFERENCES "card" ("id");

ALTER TABLE "deck_card" ADD FOREIGN KEY ("id_deck") REFERENCES "deck" ("id");

ALTER TABLE "user_deck" ADD FOREIGN KEY ("id_deck") REFERENCES "deck" ("id");

ALTER TABLE "user_deck" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");

ALTER TABLE "deck_card" ADD FOREIGN KEY ("id_card") REFERENCES "card" ("id");

ALTER TABLE "card_attribute" ADD FOREIGN KEY ("id_attribute") REFERENCES "attribute" ("id");

ALTER TABLE "leaderboard" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");
