INSERT INTO contact_message (name, email, subject, message, statusi, created_at)
SELECT
    TRIM(CONCAT(COALESCE(k.emri, ''), ' ', COALESCE(k.mbiemri, ''))),
    k.email,
    k.adresa,
    '',
    COALESCE(k.statusi, 'I ri'),
    COALESCE(CAST(k.data_regjistrimit AS DATETIME), NOW(6))
FROM klienti k
WHERE LOWER(COALESCE(k.lloji, '')) LIKE '%kontakt%'
  AND NOT EXISTS (
      SELECT 1
      FROM contact_message cm
      WHERE COALESCE(cm.email, '') = COALESCE(k.email, '')
        AND COALESCE(cm.subject, '') = COALESCE(k.adresa, '')
        AND COALESCE(cm.name, '') = TRIM(CONCAT(COALESCE(k.emri, ''), ' ', COALESCE(k.mbiemri, '')))
  );
