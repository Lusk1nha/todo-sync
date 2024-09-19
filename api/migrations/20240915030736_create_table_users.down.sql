-- Add down migration script here
-- Drop the trigger and function
DROP TRIGGER IF EXISTS update_user_modtime ON users;
-- Drop the function
DROP FUNCTION IF EXISTS update_updated_at_column;
-- Drop the users table
DROP TABLE IF EXISTS users;