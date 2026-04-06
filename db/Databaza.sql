
CREATE DATABASE TixheDecor;
USE TixheDecor;
CREATE TABLE Klienti (
    klienti_id INT AUTO_INCREMENT PRIMARY KEY,
    emri VARCHAR(50),
    mbiemri VARCHAR(50),
    email VARCHAR(100),
    telefoni VARCHAR(20),
    adresa VARCHAR(100),
    qyteti VARCHAR(50),
    data_regjistrimit DATE,
    statusi VARCHAR(20),
    lloji VARCHAR(50)
);
CREATE TABLE Projekti (
    projekti_id INT AUTO_INCREMENT PRIMARY KEY,
    klienti_id INT,
    emri_projektit VARCHAR(100),
    pershkrimi TEXT,
    data_fillimit DATE,
    data_perfundimit DATE,
    buxheti DECIMAL(10,2),
    statusi VARCHAR(30),
    lloji_dekorimit VARCHAR(50),
    lokacioni VARCHAR(100),
    FOREIGN KEY (klienti_id) REFERENCES Klienti(klienti_id)
);
CREATE TABLE Punetori (
    punetori_id INT AUTO_INCREMENT PRIMARY KEY,
    emri VARCHAR(50),
    mbiemri VARCHAR(50),
    pozita VARCHAR(50),
    specializimi VARCHAR(50),
    telefoni VARCHAR(20),
    email VARCHAR(100),
    paga DECIMAL(10,2),
    data_punesimit DATE,
    statusi VARCHAR(20)
);
CREATE TABLE Detyrimi_Projektit (
    detyrimi_id INT AUTO_INCREMENT PRIMARY KEY,
    projekti_id INT,
    punetori_id INT,
    pershkrimi TEXT,
    data_fillimit DATE,
    data_perfundimit DATE,
    statusi VARCHAR(30),
    prioriteti VARCHAR(20),
    FOREIGN KEY (projekti_id) REFERENCES Projekti(projekti_id),
    FOREIGN KEY (punetori_id) REFERENCES Punetori(punetori_id)
);
CREATE TABLE Furnitori (
    furnitori_id INT AUTO_INCREMENT PRIMARY KEY,
    emri VARCHAR(100),
    adresa VARCHAR(100),
    telefoni VARCHAR(20),
    email VARCHAR(100),
    kontakti_kryesor VARCHAR(100),
    kushtet_pageses VARCHAR(100),
    statusi VARCHAR(20),
    vleresimi INT
);
CREATE TABLE Materiali (
    materiali_id INT AUTO_INCREMENT PRIMARY KEY,
    emri VARCHAR(100),
    pershkrimi TEXT,
    njesia_matese VARCHAR(20),
    cmimi_per_njesi DECIMAL(10,2),
    sasia_stokut INT,
    furnitori_id INT,
    kategoria VARCHAR(50),
    ngjyra VARCHAR(30),
    FOREIGN KEY (furnitori_id) REFERENCES Furnitori(furnitori_id)
);
CREATE TABLE Materiali_Projektit (
    mp_id INT AUTO_INCREMENT PRIMARY KEY,
    projekti_id INT,
    materiali_id INT,
    sasia INT,
    cmimi_total DECIMAL(10,2),
    data_perdorimit DATE,
    shenime TEXT,
    FOREIGN KEY (projekti_id) REFERENCES Projekti(projekti_id),
    FOREIGN KEY (materiali_id) REFERENCES Materiali(materiali_id)
);
CREATE TABLE Fatura (
    fatura_id INT AUTO_INCREMENT PRIMARY KEY,
    projekti_id INT,
    klienti_id INT,
    shuma_totale DECIMAL(10,2),
    data_fatures DATE,
    data_pageses DATE,
    statusi VARCHAR(20),
    metoda_pageses VARCHAR(50),
    nr_fatures VARCHAR(50),
    FOREIGN KEY (projekti_id) REFERENCES Projekti(projekti_id),
    FOREIGN KEY (klienti_id) REFERENCES Klienti(klienti_id)
);
CREATE TABLE Fotografia (
    fotografia_id INT AUTO_INCREMENT PRIMARY KEY,
    projekti_id INT,
    shtegu VARCHAR(255),
    pershkrimi TEXT,
    data_ngarkimit DATE,
    lloji VARCHAR(20),
    rendi INT,
    FOREIGN KEY (projekti_id) REFERENCES Projekti(projekti_id)
);
CREATE TABLE Vleresimi (
    vleresimi_id INT AUTO_INCREMENT PRIMARY KEY,
    projekti_id INT,
    klienti_id INT,
    piket INT,
    komenti TEXT,
    data_vleresimit DATE,
    rekomandimi TEXT,
    FOREIGN KEY (projekti_id) REFERENCES Projekti(projekti_id),
    FOREIGN KEY (klienti_id) REFERENCES Klienti(klienti_id)
);
--krijova  tabela shtese<3
CREATE TABLE Pagesa (
    pagesa_id INT AUTO_INCREMENT PRIMARY KEY,
    fatura_id INT,
    shuma DECIMAL(10,2),
    data_pageses DATE,
    metoda VARCHAR(50),
    statusi VARCHAR(20),
    FOREIGN KEY (fatura_id) REFERENCES Fatura(fatura_id)
); 
CREATE TABLE StockMovement (
    movement_id INT AUTO_INCREMENT PRIMARY KEY,
    materiali_id INT,
    tipi VARCHAR(20),
    sasia INT,
    data DATE,
    pershkrimi TEXT,
    FOREIGN KEY (materiali_id) REFERENCES Materiali(materiali_id)
);

