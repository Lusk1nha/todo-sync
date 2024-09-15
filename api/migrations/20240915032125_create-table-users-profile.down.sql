-- Add down migration script here
-- Drop the trigger and function
DROP TRIGGER IF EXISTS update_user_profiles_modtime ON user_profiles;
-- Drop the function
DROP FUNCTION IF EXISTS update_user_profiles_modtime;
-- Drop the users table
DROP TABLE IF EXISTS user_profiles;