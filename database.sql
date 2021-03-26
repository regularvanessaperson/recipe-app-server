CREATE DATABASE recipelist;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


CREATE TABLE recipes(
    id INT,
    recipe_name VARCHAR(50) NOT NULL PRIMARY KEY,


)

CREATE TABLE ingredients(
    id INT,
    ingredient_name,
    quantity,
    

)