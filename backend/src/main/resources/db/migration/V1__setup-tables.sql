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

    CONSTRAINT fk_categories_on_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT check_category_type CHECK (type IN ('INCOME', 'EXPENSE'))
);

CREATE TABLE IF NOT EXISTS transactions (
    id           BIGSERIAL     PRIMARY KEY,
    amount       NUMERIC(19,4) NOT NULL,
    type         VARCHAR(20)   NOT NULL,
    date         DATE          NOT NULL,
    comment      VARCHAR(255),
    category_id  BIGINT        NOT NULL,
    user_id      BIGINT        NOT NULL,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transaction_category FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT check_transaction_type CHECK (type IN ('INCOME', 'EXPENSE'))
);
