CREATE TABLE IF NOT EXISTS contact_message (
    contact_message_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    statusi VARCHAR(255),
    created_at DATETIME(6),
    PRIMARY KEY (contact_message_id)
) ENGINE=InnoDB;

INSERT INTO contact_message (name, email, subject, message, statusi, created_at)
SELECT
    TRIM(CONCAT(COALESCE(k.emri, ''), ' ', COALESCE(k.mbiemri, ''))),
    k.email,
    k.adresa,
    '',
    COALESCE(k.statusi, 'I ri'),
    COALESCE(CAST(k.data_regjistrimit AS DATETIME), NOW(6))
FROM klienti k
WHERE LOWER(COALESCE(k.lloji, '')) = 'kontakt'
  AND NOT EXISTS (
      SELECT 1
      FROM contact_message cm
      WHERE COALESCE(cm.email, '') = COALESCE(k.email, '')
        AND COALESCE(cm.subject, '') = COALESCE(k.adresa, '')
        AND COALESCE(cm.name, '') = TRIM(CONCAT(COALESCE(k.emri, ''), ' ', COALESCE(k.mbiemri, '')))
  );
