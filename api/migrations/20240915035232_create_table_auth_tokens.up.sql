-- Add up migration script here
-- Create the auth_tokens table
CREATE TABLE auth_tokens (
  token_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create an index on the token column
CREATE INDEX idx_auth_tokens_token ON auth_tokens(token);