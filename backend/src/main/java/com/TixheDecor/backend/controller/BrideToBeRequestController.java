package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.BrideToBeRequest;
import com.TixheDecor.backend.service.BrideToBeRequestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bride-to-be-requests")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@Tag(name = "Bride To Be Requests", description = "Kerkesat e klienteve per evente Bride To Be dhe Baby Shower")
public class BrideToBeRequestController {

    @Autowired
    private BrideToBeRequestService brideToBeRequestService;

    @Autowired
    private com.TixheDecor.backend.service.KlientiService klientiService;

    @Autowired
    private com.TixheDecor.backend.service.ProjektiService projektiService;

    @PostMapping
    public BrideToBeRequest create(@RequestBody BrideToBeRequest request) {
        BrideToBeRequest savedRequest = brideToBeRequestService.create(request);
        
        try {
            String eventName = "Bride To Be";
            if (request.getBrideName() != null) {
                if (request.getBrideName().startsWith("Baby Shower -")) {
                    eventName = "Baby Shower";
                } else if (request.getBrideName().startsWith("Wedding -")) {
                    eventName = "Dasme";
                }
            }

            org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            String loggedInEmail = "";
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                loggedInEmail = auth.getName();
            }

            // Krijo Klientin
            com.TixheDecor.backend.model.Klienti klienti = new com.TixheDecor.backend.model.Klienti();
            klienti.setEmri(request.getBrideName());
            klienti.setStatusi("Aktiv");
            klienti.setDataRegjistrimit(java.time.LocalDate.now());
            klienti.setLloji(eventName + ": " + request.getSelectedDecors());
            klienti.setEmail(loggedInEmail);
            com.TixheDecor.backend.model.Klienti savedKlienti = klientiService.create(klienti);
            
            // Krijo Projektin
            com.TixheDecor.backend.model.Projekti projekti = new com.TixheDecor.backend.model.Projekti();
            projekti.setKlienti(savedKlienti);
            projekti.setEmriProjektit(eventName);
            projekti.setDataFillimit(request.getEventDate());
            projekti.setLlojiDekorimit(request.getSelectedDecors());
            projekti.setLokacioni(request.getLocation());
            projekti.setStatusi("Ne Pritje");
            projekti.setBuxheti(java.math.BigDecimal.ZERO);
            projektiService.create(projekti);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return savedRequest;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<BrideToBeRequest> getAll() {
        return brideToBeRequestService.getAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BrideToBeRequest> update(@PathVariable Integer id, @RequestBody BrideToBeRequest request) {
        try {
            return brideToBeRequestService.update(id, request)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!brideToBeRequestService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Kerkesa u fshi me sukses!");
    }
}
