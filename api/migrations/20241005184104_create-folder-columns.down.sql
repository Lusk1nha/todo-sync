-- Add down migration script here
-- Drop the trigger and function for folder_columns
DROP TRIGGER IF EXISTS update_folder_columns_modtime ON folder_columns;
DROP FUNCTION IF EXISTS update_folder_columns_modtime;
-- Drop folder_columns table
DROP TABLE IF EXISTS folder_columns;