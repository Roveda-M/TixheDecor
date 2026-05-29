SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE bride_to_be_request ADD COLUMN telefoni VARCHAR(255) NULL AFTER location',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'bride_to_be_request'
      AND COLUMN_NAME = 'telefoni'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE projekti ADD COLUMN ora_eventit TIME NULL AFTER data_perfundimit',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'projekti'
      AND COLUMN_NAME = 'ora_eventit'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
