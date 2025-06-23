CREATE TABLE IF NOT EXISTS users
(
    id           BIGSERIAL     PRIMARY KEY,
    created_at   TIMESTAMP     NOT NULL,
    email        VARCHAR(255)  UNIQUE NOT NULL,
    password     VARCHAR(255)  NOT NULL
);

CREATE TABLE categories
(
    id         BIGSERIAL    PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL,
    icon       VARCHAR(50),
    type       VARCHAR(20)  NOT NULL,
    user_id    BIGINT       NOT NULL,
    created_at TIMESTAMP    WITHOUT TIME ZONE,

    CONSTRAINT fk_categories_on_user FOREIGN KEY (user_id) REFERENCES users (id)
);

ALTER TABLE categories
    ADD CONSTRAINT check_category_type
        CHECK (type IN ('INCOME', 'EXPENSE'));
