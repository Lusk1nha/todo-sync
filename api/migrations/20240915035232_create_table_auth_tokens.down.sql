-- Add down migration script here
-- Delete the index if it exists
DROP INDEX IF EXISTS idx_auth_tokens_token;
-- Delete the table if it exists
DROP TABLE IF EXISTS auth_tokens;