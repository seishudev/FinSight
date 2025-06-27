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
    icon       VARCHAR(50)  NOT NULL,
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

CREATE TABLE IF NOT EXISTS budgets(
    id            BIGSERIAL      PRIMARY KEY,
    limit_amount  NUMERIC(19, 4) NOT NULL,
    period        VARCHAR(20)    NOT NULL,
    user_id       BIGINT         NOT NULL,
    category_id   BIGINT         NOT NULL,
    created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_budgets_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_budgets_on_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_chat_messages(
    id          BIGSERIAL    PRIMARY KEY,
    role        VARCHAR(20)  NOT NULL,
    content     TEXT         NOT NULL,
    user_id     BIGINT       NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ai_chat_messages_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT check_ai_chat_role CHECK (role IN ('USER', 'ASSISTANT'))
);

CREATE TABLE IF NOT EXISTS goals(
    id             BIGSERIAL      PRIMARY KEY,
    name           VARCHAR(255)   NOT NULL UNIQUE,
    icon           VARCHAR(50)    NOT NULL,
    target_amount  NUMERIC(19, 4) NOT NULL,
    current_amount NUMERIC(19, 4) NOT NULL DEFAULT 0,
    target_date    DATE           NOT NULL,
    user_id        BIGINT         NOT NULL,
    created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_goals_on_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT check_target_amount_positive CHECK (target_amount > 0),
    CONSTRAINT check_current_amount_not_negative CHECK (current_amount >= 0)
);
