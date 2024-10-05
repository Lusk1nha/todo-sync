-- Add up migration script here
CREATE TABLE folder_columns (
  id UUID PRIMARY KEY,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (name, folder_id)
);
-- Create index on folder_id for efficient queries
CREATE INDEX idx_folder_columns_folder_id ON folder_columns(folder_id);
-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_folder_columns_modtime() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER update_folder_columns_modtime BEFORE
UPDATE ON folder_columns FOR EACH ROW EXECUTE PROCEDURE update_folder_columns_modtime();