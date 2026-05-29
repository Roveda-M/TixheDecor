package com.TixheDecor.backend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EntityCascadeDeleteService {

    private static final Logger log = LoggerFactory.getLogger(EntityCascadeDeleteService.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional(rollbackFor = Exception.class)
    public void deleteProjektiCascade(Integer projektiId) {
        if (projektiId == null) {
            return;
        }

        String pagesa = table("pagesa");
        String fatura = table("fatura");
        String detyrimi = table("detyrimi_projektit");
        String materialiProjektit = table("materiali_projektit");
        String fotografia = table("fotografia");
        String vleresimi = table("vleresimi");
        String projekti = table("projekti");

        execute(
                "DELETE p FROM " + pagesa + " p "
                        + "INNER JOIN " + fatura + " f ON p.fatura_id = f.fatura_id "
                        + "WHERE f.projekti_id = ?",
                projektiId
        );
        execute("DELETE FROM " + fatura + " WHERE projekti_id = ?", projektiId);
        execute("DELETE FROM " + detyrimi + " WHERE projekti_id = ?", projektiId);
        execute("DELETE FROM " + materialiProjektit + " WHERE projekti_id = ?", projektiId);
        execute("DELETE FROM " + fotografia + " WHERE projekti_id = ?", projektiId);
        execute("DELETE FROM " + vleresimi + " WHERE projekti_id = ?", projektiId);
        execute("DELETE FROM " + projekti + " WHERE projekti_id = ?", projektiId);
        entityManager.flush();
        log.info("U fshi projekti {} me te gjitha varësitë", projektiId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteKlientiCascade(Integer klientiId) {
        if (klientiId == null) {
            return;
        }

        String projekti = table("projekti");
        String pagesa = table("pagesa");
        String fatura = table("fatura");
        String vleresimi = table("vleresimi");
        String klienti = table("klienti");

        @SuppressWarnings("unchecked")
        List<Number> projektIds = entityManager
                .createNativeQuery("SELECT projekti_id FROM " + projekti + " WHERE klienti_id = ?")
                .setParameter(1, klientiId)
                .getResultList();

        for (Number projektiId : projektIds) {
            deleteProjektiCascade(projektiId.intValue());
        }

        execute(
                "DELETE p FROM " + pagesa + " p "
                        + "INNER JOIN " + fatura + " f ON p.fatura_id = f.fatura_id "
                        + "WHERE f.klienti_id = ?",
                klientiId
        );
        execute("DELETE FROM " + fatura + " WHERE klienti_id = ?", klientiId);
        execute("DELETE FROM " + vleresimi + " WHERE klienti_id = ?", klientiId);
        entityManager.flush();
        log.info("U pastruan varësitë e klientit {} (para fshirjes së rreshtit në {})", klientiId, klienti);
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean deleteDetyrimiIfExists(Integer detyrimiId) {
        if (detyrimiId == null) {
            return false;
        }

        String detyrimi = table("detyrimi_projektit");
        Number count = (Number) entityManager
                .createNativeQuery("SELECT COUNT(*) FROM " + detyrimi + " WHERE detyrimi_id = ?")
                .setParameter(1, detyrimiId)
                .getSingleResult();
        if (count.intValue() == 0) {
            return false;
        }
        execute("DELETE FROM " + detyrimi + " WHERE detyrimi_id = ?", detyrimiId);
        entityManager.flush();
        return true;
    }

    private String table(String logicalName) {
        try {
            return (String) entityManager
                    .createNativeQuery(
                            "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES "
                                    + "WHERE TABLE_SCHEMA = DATABASE() AND LOWER(TABLE_NAME) = LOWER(?)"
                    )
                    .setParameter(1, logicalName)
                    .getSingleResult();
        } catch (NoResultException ex) {
            log.warn("Tabela {} nuk u gjet në databazë, përdoret emri logjik", logicalName);
            return logicalName;
        }
    }

    private void execute(String sql, Object... params) {
        var query = entityManager.createNativeQuery(sql);
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i + 1, params[i]);
        }
        query.executeUpdate();
    }
}
