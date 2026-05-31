SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE users ADD COLUMN mbiemri VARCHAR(255)',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'mbiemri'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE users ADD COLUMN phone_number VARCHAR(255)',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'users'
      AND COLUMN_NAME = 'phone_number'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE users
SET emri = SUBSTRING_INDEX(TRIM(fullname), ' ', 1)
WHERE (emri IS NULL OR emri = '')
  AND fullname IS NOT NULL
  AND TRIM(fullname) <> '';

UPDATE users
SET mbiemri = TRIM(SUBSTRING(TRIM(fullname), LENGTH(SUBSTRING_INDEX(TRIM(fullname), ' ', 1)) + 1))
WHERE (mbiemri IS NULL OR mbiemri = '')
  AND fullname IS NOT NULL
  AND TRIM(fullname) LIKE '% %';

UPDATE users
SET fullname = TRIM(CONCAT(COALESCE(emri, ''), ' ', COALESCE(mbiemri, '')))
WHERE (fullname IS NULL OR fullname = '')
  AND (emri IS NOT NULL OR mbiemri IS NOT NULL);
