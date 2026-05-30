package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.BrideToBeRequest;
import com.TixheDecor.backend.model.Klienti;
import com.TixheDecor.backend.model.Projekti;
import com.TixheDecor.backend.repository.BrideToBeRequestRepository;
import com.TixheDecor.backend.repository.KlientiRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EventRequestKlientiSyncService {

    private static final Logger log = LoggerFactory.getLogger(EventRequestKlientiSyncService.class);

    @Autowired
    private KlientiRepository klientiRepository;

    @Autowired
    private BrideToBeRequestRepository brideToBeRequestRepository;

    @Autowired
    private ProjektiService projektiService;

    public void syncAfterRequestSaved(BrideToBeRequest request) {
        if (request == null || request.getBrideName() == null || request.getBrideName().isBlank()) {
            return;
        }

        try {
            upsertKlientiFromRequest(request);
        } catch (Exception ex) {
            log.error("Deshtoi sinkronizimi i klientit nga kerkesa {}", request.getRequestId(), ex);
        }

        try {
            upsertProjektiFromRequest(request);
        } catch (Exception ex) {
            log.error("Deshtoi sinkronizimi i projektit nga kerkesa {}", request.getRequestId(), ex);
        }
    }

    public void syncAllFromRequests() {
        for (BrideToBeRequest request : brideToBeRequestRepository.findAll()) {
            syncAfterRequestSaved(request);
        }
    }

    public List<Klienti> enrichKlientetForDashboard(List<Klienti> klientet) {
        List<BrideToBeRequest> requests = brideToBeRequestRepository.findAll();
        Map<String, BrideToBeRequest> requestByClientName = indexRequestsByClientName(requests);

        for (Klienti klienti : klientet) {
            applyRequestData(klienti, findRequestForKlienti(klienti, requestByClientName, requests));
        }

        return klientet;
    }

    private void upsertKlientiFromRequest(BrideToBeRequest request) {
        String brideName = request.getBrideName().trim();
        String displayName = stripEventPrefix(brideName);
        if (displayName.isBlank()) {
            displayName = brideName;
        }

        Klienti klienti = findKlientiForRequest(request).orElseGet(Klienti::new);

        klienti.setEmri(displayName);
        klienti.setStatusi(Optional.ofNullable(klienti.getStatusi()).filter(s -> !s.isBlank()).orElse("Aktiv"));
        if (klienti.getDataRegjistrimit() == null) {
            klienti.setDataRegjistrimit(java.time.LocalDate.now());
        }
        klienti.setLloji(formatEventSource(brideName));

        if (!isBlank(request.getLocation())) {
            klienti.setAdresa(request.getLocation().trim());
        }

        if (!isBlank(request.getTelefoni())) {
            klienti.setTelefoni(request.getTelefoni().trim());
        }

        if (!isBlank(request.getEmail())) {
            klienti.setEmail(request.getEmail().trim());
        }

        klientiRepository.save(klienti);
    }

    private void upsertProjektiFromRequest(BrideToBeRequest request) {
        Optional<Klienti> klientiOpt = findKlientiForRequest(request);
        if (klientiOpt.isEmpty()) {
            return;
        }

        Klienti klienti = klientiOpt.get();
        String eventName = resolveEventName(request.getBrideName());

        Optional<Projekti> existing = projektiService.getByKlienti(klienti.getKlientiId()).stream()
                .filter(p -> eventName.equalsIgnoreCase(Optional.ofNullable(p.getEmriProjektit()).orElse(""))
                        && sameDate(p, request))
                .findFirst();

        if (existing.isPresent()) {
            Projekti projekti = existing.get();
            boolean changed = false;

            if (projekti.getOraEventit() == null && request.getEventTime() != null) {
                projekti.setOraEventit(request.getEventTime());
                changed = true;
            }
            if (isBlank(projekti.getLokacioni()) && !isBlank(request.getLocation())) {
                projekti.setLokacioni(request.getLocation().trim());
                changed = true;
            }
            if (isBlank(projekti.getLlojiDekorimit()) && !isBlank(request.getSelectedDecors())) {
                projekti.setLlojiDekorimit(request.getSelectedDecors());
                changed = true;
            }
            if (projekti.getKapari() == null) {
                projekti.setKapari(BigDecimal.ZERO);
                changed = true;
            }

            if (changed) {
                projektiService.update(projekti.getProjektiId(), projekti);
            }
            return;
        }

        Projekti projekti = new Projekti();
        projekti.setKlienti(klienti);
        projekti.setEmriProjektit(eventName);
        projekti.setDataFillimit(request.getEventDate());
        projekti.setOraEventit(request.getEventTime());
        projekti.setLlojiDekorimit(request.getSelectedDecors());
        projekti.setLokacioni(request.getLocation());
        projekti.setStatusi("Ne Pritje");
        projekti.setBuxheti(BigDecimal.ZERO);
        projekti.setKapari(BigDecimal.ZERO);

        try {
            projektiService.create(projekti);
        } catch (Exception ex) {
            log.warn("Projekti pa ora_eventit per kerkesen {}: {}", request.getRequestId(), ex.getMessage());
            projekti.setOraEventit(null);
            projektiService.create(projekti);
        }
    }

    private void applyRequestData(Klienti klienti, BrideToBeRequest request) {
        if (request == null) {
            return;
        }

        boolean changed = false;

        if (isBlank(klienti.getAdresa()) && !isBlank(request.getLocation())) {
            klienti.setAdresa(request.getLocation().trim());
            changed = true;
        }

        if (isBlank(klienti.getTelefoni()) && !isBlank(request.getTelefoni())) {
            klienti.setTelefoni(request.getTelefoni().trim());
            changed = true;
        }

        if (!isBlank(request.getEmail()) && isBlank(klienti.getEmail())) {
            klienti.setEmail(request.getEmail().trim());
            changed = true;
        }

        String displayName = stripEventPrefix(request.getBrideName());
        if (!displayName.isBlank() && !displayName.equalsIgnoreCase(Optional.ofNullable(klienti.getEmri()).orElse(""))) {
            klienti.setEmri(displayName);
            changed = true;
        }

        String eventSource = formatEventSource(request.getBrideName());
        if (isBlank(klienti.getLloji()) || !klienti.getLloji().startsWith("From:")) {
            klienti.setLloji(eventSource);
            changed = true;
        }

        if (changed) {
            klientiRepository.save(klienti);
        }
    }

    private Optional<Klienti> findKlientiForRequest(BrideToBeRequest request) {
        if (request == null || isBlank(request.getBrideName())) {
            return Optional.empty();
        }
        String brideName = request.getBrideName().trim();
        Optional<Klienti> found = klientiRepository.findFirstByEmriIgnoreCase(brideName);
        if (found.isPresent()) {
            return found;
        }
        String displayName = stripEventPrefix(brideName);
        if (!displayName.isBlank()) {
            return klientiRepository.findFirstByEmriIgnoreCase(displayName);
        }
        return Optional.empty();
    }

    private Map<String, BrideToBeRequest> indexRequestsByClientName(List<BrideToBeRequest> requests) {
        Map<String, BrideToBeRequest> indexed = new HashMap<>();
        for (BrideToBeRequest request : requests) {
            if (request.getBrideName() == null || request.getBrideName().isBlank()) {
                continue;
            }
            indexed.put(normalizeKey(request.getBrideName()), request);
            String stripped = stripEventPrefix(request.getBrideName());
            if (!stripped.isBlank()) {
                indexed.put(normalizeKey(stripped), request);
            }
        }
        return indexed;
    }

    private BrideToBeRequest findRequestForKlienti(
            Klienti klienti,
            Map<String, BrideToBeRequest> indexed,
            List<BrideToBeRequest> requests
    ) {
        if (klienti == null) {
            return null;
        }

        String emri = Optional.ofNullable(klienti.getEmri()).orElse("").trim();
        String mbiemri = Optional.ofNullable(klienti.getMbiemri()).orElse("").trim();
        String fullName = (emri + " " + mbiemri).trim();

        for (String candidate : List.of(emri, fullName, stripEventPrefix(emri), stripEventPrefix(fullName))) {
            if (candidate.isBlank()) {
                continue;
            }
            BrideToBeRequest request = indexed.get(normalizeKey(candidate));
            if (request != null) {
                return request;
            }
        }

        for (BrideToBeRequest request : requests) {
            if (request.getBrideName() == null || request.getBrideName().isBlank()) {
                continue;
            }
            String requestName = stripEventPrefix(request.getBrideName());
            if (requestName.equalsIgnoreCase(emri) || requestName.equalsIgnoreCase(fullName)) {
                return request;
            }
            if (!emri.isBlank() && request.getBrideName().toLowerCase().contains(emri.toLowerCase())) {
                return request;
            }
        }

        return null;
    }

    private static String normalizeKey(String value) {
        return value == null ? "" : value.trim().toLowerCase();
    }

    private static String stripEventPrefix(String value) {
        if (value == null) {
            return "";
        }
        return value.replaceFirst("^(?i)(Wedding|Baby Shower|Bride To Be|Engagement|Circumcision)\\s*-\\s*", "").trim();
    }

    private static String resolveEventName(String brideName) {
        if (brideName == null) {
            return "Bride To Be";
        }
        if (brideName.startsWith("Baby Shower -")) {
            return "Baby Shower";
        }
        if (brideName.startsWith("Wedding -")) {
            return "Wedding";
        }
        if (brideName.startsWith("Engagement -")) {
            return "Engagement";
        }
        if (brideName.startsWith("Circumcision -")) {
            return "Circumcision";
        }
        return "Bride To Be";
    }

    private static String formatEventSource(String brideName) {
        return "From: " + resolveEventName(brideName);
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private static boolean sameDate(Projekti projekti, BrideToBeRequest request) {
        if (projekti.getDataFillimit() == null || request.getEventDate() == null) {
            return true;
        }
        return projekti.getDataFillimit().equals(request.getEventDate());
    }
}
