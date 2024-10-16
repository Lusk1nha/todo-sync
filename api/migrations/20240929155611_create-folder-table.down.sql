-- Add down migration script here
-- Delete the index if it exists
DROP INDEX IF EXISTS idx_folders_user_id;
-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS update_folders_modtime ON folders;
-- Drop the function if it exists
DROP FUNCTION IF EXISTS update_folders_modtime;
-- DROP TABLE folders;
DROP TABLE IF EXISTS folders;