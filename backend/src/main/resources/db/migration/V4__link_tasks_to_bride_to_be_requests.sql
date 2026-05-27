ALTER TABLE detyrimi_projektit
    ADD COLUMN bride_to_be_request_id INT,
    ADD COLUMN include_client_images BIT DEFAULT 0;

ALTER TABLE detyrimi_projektit
    ADD KEY idx_detyrimi_projektit_bride_request_id (bride_to_be_request_id),
    ADD CONSTRAINT fk_detyrimi_projektit_bride_request
        FOREIGN KEY (bride_to_be_request_id) REFERENCES bride_to_be_request (request_id);
