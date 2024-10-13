-- Add up migration script here
-- Create folders table
CREATE TABLE folders (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#f97316',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (name, user_id)
);
-- Create an index on the user_id column
CREATE INDEX idx_folders_user_id ON folders(user_id);
-- Create the function that updates the updated_at column on the user_profiles table
CREATE OR REPLACE FUNCTION update_folders_modtime() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER update_folders_modtime BEFORE
UPDATE ON folders FOR EACH ROW EXECUTE PROCEDURE update_folders_modtime();