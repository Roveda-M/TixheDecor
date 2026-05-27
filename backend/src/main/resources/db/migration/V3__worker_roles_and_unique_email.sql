ALTER TABLE punetori ADD CONSTRAINT uk_punetori_email UNIQUE (email);

INSERT INTO roles (emertimi, pershkrimi, normalized_name)
SELECT 'ROLE_ADMIN', 'Administrator me qasje te plote', 'ROLE_ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE emertimi = 'ROLE_ADMIN');

INSERT INTO roles (emertimi, pershkrimi, normalized_name)
SELECT 'ROLE_USER', 'Perdorues me qasje te kufizuar', 'ROLE_USER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE emertimi = 'ROLE_USER');

INSERT INTO roles (emertimi, pershkrimi, normalized_name)
SELECT 'ROLE_WORKER', 'Punetor me qasje ne detyrat e veta', 'ROLE_WORKER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE emertimi = 'ROLE_WORKER');

INSERT INTO user_role (user_id, role_id)
SELECT ur.user_id, worker_role.id
FROM user_role ur
JOIN roles old_role ON old_role.id = ur.role_id
JOIN roles worker_role ON worker_role.emertimi = 'ROLE_WORKER'
WHERE old_role.emertimi IN ('ROLE_PUNETOR', 'ROLE_PUNETORI')
  AND NOT EXISTS (
      SELECT 1
      FROM user_role existing
      WHERE existing.user_id = ur.user_id
        AND existing.role_id = worker_role.id
  );

DELETE FROM user_role
WHERE role_id IN (
    SELECT id FROM roles
    WHERE emertimi NOT IN ('ROLE_ADMIN', 'ROLE_USER', 'ROLE_WORKER')
);

DELETE FROM roles
WHERE emertimi NOT IN ('ROLE_ADMIN', 'ROLE_USER', 'ROLE_WORKER');
