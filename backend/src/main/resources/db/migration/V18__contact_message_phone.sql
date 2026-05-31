SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE contact_message ADD COLUMN phone_number VARCHAR(255) AFTER email',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'contact_message'
      AND COLUMN_NAME = 'phone_number'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE contact_message cm
JOIN users u ON u.email = cm.email
SET cm.phone_number = u.phone_number
WHERE (cm.phone_number IS NULL OR cm.phone_number = '')
  AND u.phone_number IS NOT NULL
  AND u.phone_number <> '';
