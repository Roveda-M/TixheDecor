CREATE TABLE IF NOT EXISTS roles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    emertimi VARCHAR(255) NOT NULL,
    pershkrimi VARCHAR(255),
    normalized_name VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE KEY uk_roles_emertimi (emertimi),
    UNIQUE KEY uk_roles_normalized_name (normalized_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    emri VARCHAR(255),
    mbiemri VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    email_confirmed BIT NOT NULL,
    lockout_enabled BIT NOT NULL,
    access_failed_count INT NOT NULL,
    data_krijimit DATETIME(6),
    statusi VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_role (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (id),
    KEY idx_user_role_user_id (user_id),
    KEY idx_user_role_role_id (role_id),
    CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES roles (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_claims (
    claim_id INT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    claim_type VARCHAR(255),
    claim_value VARCHAR(255),
    PRIMARY KEY (claim_id),
    KEY idx_user_claims_user_id (user_id),
    CONSTRAINT fk_user_claims_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_tokens (
    token_id INT NOT NULL AUTO_INCREMENT,
    login_provider VARCHAR(255),
    user_id BIGINT,
    token VARCHAR(255),
    token_type VARCHAR(255),
    expires_at DATETIME(6),
    is_revoked BIT,
    PRIMARY KEY (token_id),
    KEY idx_user_tokens_user_id (user_id),
    CONSTRAINT fk_user_tokens_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS refresh_token (
    token_id INT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    token VARCHAR(255),
    expires_at DATETIME(6),
    created_at DATETIME(6),
    is_revoked BIT,
    PRIMARY KEY (token_id),
    KEY idx_refresh_token_user_id (user_id),
    CONSTRAINT fk_refresh_token_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS klienti (
    klienti_id INT NOT NULL AUTO_INCREMENT,
    emri VARCHAR(255),
    mbiemri VARCHAR(255),
    email VARCHAR(255),
    telefoni VARCHAR(255),
    adresa VARCHAR(255),
    qyteti VARCHAR(255),
    data_regjistrimit DATE,
    statusi VARCHAR(255),
    lloji VARCHAR(255),
    PRIMARY KEY (klienti_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS furnitori (
    furnitori_id INT NOT NULL AUTO_INCREMENT,
    emri VARCHAR(255),
    adresa VARCHAR(255),
    telefoni VARCHAR(255),
    email VARCHAR(255),
    kontakti_kryesor VARCHAR(255),
    kushtet_pageses VARCHAR(255),
    statusi VARCHAR(255),
    vleresimi INT,
    PRIMARY KEY (furnitori_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS materiali (
    materiali_id INT NOT NULL AUTO_INCREMENT,
    furnitori_id INT,
    emri VARCHAR(255),
    pershkrimi TEXT,
    njesia_matese VARCHAR(255),
    cmimi_per_njesi DECIMAL(10, 2),
    sasia_stokut INT,
    kategoria VARCHAR(255),
    ngjyra VARCHAR(255),
    PRIMARY KEY (materiali_id),
    KEY idx_materiali_furnitori_id (furnitori_id),
    CONSTRAINT fk_materiali_furnitori FOREIGN KEY (furnitori_id) REFERENCES furnitori (furnitori_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projekti (
    projekti_id INT NOT NULL AUTO_INCREMENT,
    klienti_id INT,
    emri_projektit VARCHAR(255),
    pershkrimi TEXT,
    data_fillimit DATE,
    data_perfundimit DATE,
    buxheti DECIMAL(10, 2),
    statusi VARCHAR(255),
    lloji_dekorimit VARCHAR(255),
    lokacioni VARCHAR(255),
    PRIMARY KEY (projekti_id),
    KEY idx_projekti_klienti_id (klienti_id),
    CONSTRAINT fk_projekti_klienti FOREIGN KEY (klienti_id) REFERENCES klienti (klienti_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fatura (
    fatura_id INT NOT NULL AUTO_INCREMENT,
    projekti_id INT,
    klienti_id INT,
    shuma_totale DECIMAL(10, 2),
    data_fatures DATE,
    data_pageses DATE,
    statusi VARCHAR(255),
    metoda_pageses VARCHAR(255),
    nr_fatures VARCHAR(255),
    PRIMARY KEY (fatura_id),
    KEY idx_fatura_projekti_id (projekti_id),
    KEY idx_fatura_klienti_id (klienti_id),
    CONSTRAINT fk_fatura_projekti FOREIGN KEY (projekti_id) REFERENCES projekti (projekti_id),
    CONSTRAINT fk_fatura_klienti FOREIGN KEY (klienti_id) REFERENCES klienti (klienti_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pagesa (
    pagesa_id INT NOT NULL AUTO_INCREMENT,
    fatura_id INT,
    shuma DECIMAL(10, 2),
    data_pageses DATE,
    metoda VARCHAR(255),
    statusi VARCHAR(255),
    PRIMARY KEY (pagesa_id),
    KEY idx_pagesa_fatura_id (fatura_id),
    CONSTRAINT fk_pagesa_fatura FOREIGN KEY (fatura_id) REFERENCES fatura (fatura_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS punetori (
    punetori_id INT NOT NULL AUTO_INCREMENT,
    emri VARCHAR(255),
    mbiemri VARCHAR(255),
    pozita VARCHAR(255),
    specializimi VARCHAR(255),
    telefoni VARCHAR(255),
    email VARCHAR(255),
    paga DECIMAL(10, 2),
    data_punesimit DATE,
    statusi VARCHAR(255),
    PRIMARY KEY (punetori_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detyrimi_projektit (
    detyrimi_id INT NOT NULL AUTO_INCREMENT,
    projekti_id INT,
    punetori_id INT,
    pershkrimi TEXT,
    data_fillimit DATE,
    data_perfundimit DATE,
    statusi VARCHAR(255),
    prioriteti VARCHAR(255),
    PRIMARY KEY (detyrimi_id),
    KEY idx_detyrimi_projektit_projekti_id (projekti_id),
    KEY idx_detyrimi_projektit_punetori_id (punetori_id),
    CONSTRAINT fk_detyrimi_projektit_projekti FOREIGN KEY (projekti_id) REFERENCES projekti (projekti_id),
    CONSTRAINT fk_detyrimi_projektit_punetori FOREIGN KEY (punetori_id) REFERENCES punetori (punetori_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS materiali_projektit (
    mp_id INT NOT NULL AUTO_INCREMENT,
    projekti_id INT,
    materiali_id INT,
    sasia INT,
    cmimi_total DECIMAL(10, 2),
    data_perdorimit DATE,
    shenime TEXT,
    PRIMARY KEY (mp_id),
    KEY idx_materiali_projektit_projekti_id (projekti_id),
    KEY idx_materiali_projektit_materiali_id (materiali_id),
    CONSTRAINT fk_materiali_projektit_projekti FOREIGN KEY (projekti_id) REFERENCES projekti (projekti_id),
    CONSTRAINT fk_materiali_projektit_materiali FOREIGN KEY (materiali_id) REFERENCES materiali (materiali_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fotografia (
    fotografia_id INT NOT NULL AUTO_INCREMENT,
    projekti_id INT,
    shtegu VARCHAR(255),
    pershkrimi TEXT,
    data_ngarkimit DATE,
    lloji VARCHAR(255),
    rendi INT,
    PRIMARY KEY (fotografia_id),
    KEY idx_fotografia_projekti_id (projekti_id),
    CONSTRAINT fk_fotografia_projekti FOREIGN KEY (projekti_id) REFERENCES projekti (projekti_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_movement (
    movement_id INT NOT NULL AUTO_INCREMENT,
    materiali_id INT,
    tipi VARCHAR(255),
    sasia INT,
    data DATE,
    pershkrimi TEXT,
    PRIMARY KEY (movement_id),
    KEY idx_stock_movement_materiali_id (materiali_id),
    CONSTRAINT fk_stock_movement_materiali FOREIGN KEY (materiali_id) REFERENCES materiali (materiali_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vleresimi (
    vleresimi_id INT NOT NULL AUTO_INCREMENT,
    projekti_id INT,
    klienti_id INT,
    piket INT,
    komenti TEXT,
    data_vleresimit DATE,
    rekomandimi TEXT,
    PRIMARY KEY (vleresimi_id),
    KEY idx_vleresimi_projekti_id (projekti_id),
    KEY idx_vleresimi_klienti_id (klienti_id),
    CONSTRAINT fk_vleresimi_projekti FOREIGN KEY (projekti_id) REFERENCES projekti (projekti_id),
    CONSTRAINT fk_vleresimi_klienti FOREIGN KEY (klienti_id) REFERENCES klienti (klienti_id)
) ENGINE=InnoDB;
