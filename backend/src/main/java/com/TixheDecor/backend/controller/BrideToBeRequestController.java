package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.BrideToBeRequest;
import com.TixheDecor.backend.service.BrideToBeRequestService;
import com.TixheDecor.backend.service.EventRequestKlientiSyncService;
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
    private EventRequestKlientiSyncService eventRequestKlientiSyncService;

    @PostMapping
    public BrideToBeRequest create(@RequestBody BrideToBeRequest request) {
        BrideToBeRequest savedRequest = brideToBeRequestService.create(request);
        eventRequestKlientiSyncService.syncAfterRequestSaved(savedRequest);
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
