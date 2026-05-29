UPDATE users SET access_failed_count = 0 WHERE access_failed_count IS NULL;
UPDATE users SET email_confirmed = 0 WHERE email_confirmed IS NULL;
UPDATE users SET lockout_enabled = 1 WHERE lockout_enabled IS NULL;

ALTER TABLE users MODIFY access_failed_count INT NOT NULL DEFAULT 0;
ALTER TABLE users MODIFY email_confirmed BIT NOT NULL DEFAULT 0;
ALTER TABLE users MODIFY lockout_enabled BIT NOT NULL DEFAULT 1;
