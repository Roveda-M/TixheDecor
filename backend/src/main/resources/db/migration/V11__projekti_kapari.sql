SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE projekti ADD COLUMN kapari DECIMAL(10, 2) NULL AFTER buxheti',
        'SELECT 1'
    )
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'projekti'
      AND COLUMN_NAME = 'kapari'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
