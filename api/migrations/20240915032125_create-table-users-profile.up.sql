-- Add up migration script here
-- Create the users_profile table
CREATE TABLE user_profiles (
  user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(50) NOT NULL UNIQUE,
  date_of_birth DATE,
  profile_picture_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create the function that updates the updated_at column on the user_profiles table
CREATE OR REPLACE FUNCTION update_user_profiles_modtime() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
CREATE TRIGGER update_user_profiles_modtime BEFORE
UPDATE ON user_profiles FOR EACH ROW EXECUTE PROCEDURE update_user_profiles_modtime();