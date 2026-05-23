CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(30),
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT username_not_blank CHECK (username IS NULL OR TRIM(username) <> ''),
  CONSTRAINT email_not_blank CHECK (TRIM(email) <> ''),
  CONSTRAINT password_hash_not_blank CHECK (TRIM(password_hash) <> '')
);

CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_name VARCHAR(30) NOT NULL,
  goal_target NUMERIC(12,2) NOT NULL,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT goal_name_not_blank CHECK (TRIM(goal_name) <> ''),
  CONSTRAINT goal_target_positive CHECK (goal_target > 0)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_id INTEGER NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  note VARCHAR(150),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT transaction_type_valid CHECK (transaction_type IN ('deposit','withdrawal')),
  CONSTRAINT amount_positive CHECK (amount > 0)
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE VIEW user_total_savings AS
  SELECT 
    user_id,
    SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE -amount END) AS total_savings
  FROM transactions
  GROUP BY user_id;

CREATE OR REPLACE VIEW goal_balances AS
  SELECT 
    goal_id,
    SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE -amount END) AS current
  FROM transactions
  GROUP BY goal_id;

CREATE OR REPLACE VIEW monthly_activity AS
  SELECT 
    user_id,
    DATE_TRUNC('month', created_at) AS month,
    SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END) AS deposits,
    SUM(CASE WHEN transaction_type = 'withdrawal' THEN amount ELSE 0 END) AS withdrawals
  FROM transactions
  GROUP BY user_id, month;
