-- this just prewrites our commands for us, then you copy and paste in command line 

CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);