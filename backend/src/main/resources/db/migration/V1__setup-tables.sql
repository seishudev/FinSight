CREATE TABLE IF NOT EXISTS users
(
    id           BIGSERIAL     PRIMARY KEY,
    created_at   TIMESTAMP     NOT NULL,
    email        VARCHAR(255)  UNIQUE NOT NULL,
    password     VARCHAR(255)  NOT NULL
);
