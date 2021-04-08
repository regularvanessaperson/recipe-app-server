CREATE DATABASE recipelist;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


CREATE TABLE recipes(
    recipe_id uuid  PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    recipe_name VARCHAR NOT NULL,
    recipe_ingredients json NOT NULL,
    recipe_instructions TEXT NOT NULL,
    recipe_favorite BOOLEAN NOT NULL DEFAULT
    false,
    user_id uuid,
    CONSTRAINT fk_user_id 
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id) 
);


CREATE TABLE lists(
    list_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    list_name VARCHAR(255) NOT NULL,
    list_ingredients TEXT [] NOT NULL,
    user_id uuid,
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);