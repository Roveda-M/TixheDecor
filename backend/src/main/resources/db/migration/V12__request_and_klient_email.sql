SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE bride_to_be_request ADD COLUMN email VARCHAR(255) NULL AFTER telefoni',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'bride_to_be_request'
      AND COLUMN_NAME = 'email'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
