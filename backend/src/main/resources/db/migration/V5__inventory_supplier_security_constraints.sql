INSERT INTO roles (emertimi, pershkrimi, normalized_name)
SELECT 'ROLE_MANAGER', 'Menaxher me qasje ne operacionet e biznesit', 'ROLE_MANAGER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE emertimi = 'ROLE_MANAGER');

UPDATE furnitori
SET emri = COALESCE(NULLIF(TRIM(emri), ''), CONCAT('Furnitor #', furnitori_id)),
    kontakti_kryesor = COALESCE(NULLIF(TRIM(kontakti_kryesor), ''), 'I papercaktuar'),
    kushtet_pageses = COALESCE(NULLIF(TRIM(kushtet_pageses), ''), 'I papercaktuar'),
    vleresimi = COALESCE(vleresimi, 1);

UPDATE materiali
SET emri = COALESCE(NULLIF(TRIM(emri), ''), CONCAT('Material #', materiali_id)),
    njesia_matese = COALESCE(NULLIF(TRIM(njesia_matese), ''), 'cope'),
    cmimi_per_njesi = COALESCE(cmimi_per_njesi, 0),
    sasia_stokut = COALESCE(sasia_stokut, 0),
    kategoria = COALESCE(NULLIF(TRIM(kategoria), ''), 'Te tjera');

UPDATE materiali_projektit mp
JOIN materiali m ON m.materiali_id = mp.materiali_id
SET mp.sasia = COALESCE(mp.sasia, 1),
    mp.cmimi_total = COALESCE(mp.cmimi_total, COALESCE(m.cmimi_per_njesi, 0) * COALESCE(mp.sasia, 1))
WHERE mp.projekti_id IS NOT NULL
  AND mp.materiali_id IS NOT NULL;

UPDATE stock_movement
SET tipi = COALESCE(NULLIF(TRIM(tipi), ''), 'ADJUSTMENT'),
    sasia = COALESCE(sasia, 1),
    data = COALESCE(data, CURRENT_DATE)
WHERE materiali_id IS NOT NULL;

ALTER TABLE furnitori
    MODIFY emri VARCHAR(255) NOT NULL,
    MODIFY kontakti_kryesor VARCHAR(255) NOT NULL,
    MODIFY kushtet_pageses VARCHAR(255) NOT NULL,
    MODIFY vleresimi INT NOT NULL;

ALTER TABLE materiali
    MODIFY emri VARCHAR(255) NOT NULL,
    MODIFY njesia_matese VARCHAR(255) NOT NULL,
    MODIFY cmimi_per_njesi DECIMAL(10, 2) NOT NULL,
    MODIFY sasia_stokut INT NOT NULL,
    MODIFY kategoria VARCHAR(255) NOT NULL;

ALTER TABLE materiali_projektit
    MODIFY sasia INT NOT NULL,
    MODIFY cmimi_total DECIMAL(10, 2) NOT NULL;

ALTER TABLE stock_movement
    MODIFY tipi VARCHAR(255) NOT NULL,
    MODIFY sasia INT NOT NULL,
    MODIFY data DATE NOT NULL;

ALTER TABLE furnitori
    ADD CONSTRAINT chk_furnitori_vleresimi CHECK (vleresimi BETWEEN 1 AND 5);

ALTER TABLE materiali
    ADD CONSTRAINT chk_materiali_cmimi CHECK (cmimi_per_njesi >= 0),
    ADD CONSTRAINT chk_materiali_sasia_stokut CHECK (sasia_stokut >= 0);

ALTER TABLE materiali_projektit
    ADD CONSTRAINT chk_materiali_projektit_sasia CHECK (sasia > 0),
    ADD CONSTRAINT chk_materiali_projektit_cmimi CHECK (cmimi_total >= 0);

ALTER TABLE stock_movement
    ADD CONSTRAINT chk_stock_movement_sasia CHECK (sasia > 0),
    ADD CONSTRAINT chk_stock_movement_tipi CHECK (tipi IN ('IN', 'OUT', 'ADJUSTMENT'));

CREATE INDEX idx_materiali_kategoria ON materiali (kategoria);
CREATE INDEX idx_materiali_emri ON materiali (emri);
CREATE INDEX idx_furnitori_statusi ON furnitori (statusi);
CREATE INDEX idx_furnitori_email ON furnitori (email);
CREATE INDEX idx_materiali_projektit_data_perdorimit ON materiali_projektit (data_perdorimit);
