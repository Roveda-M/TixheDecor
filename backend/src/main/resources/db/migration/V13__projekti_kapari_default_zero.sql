UPDATE projekti
SET kapari = 0
WHERE kapari IS NULL;

ALTER TABLE projekti
    MODIFY kapari DECIMAL(10, 2) NOT NULL DEFAULT 0;
