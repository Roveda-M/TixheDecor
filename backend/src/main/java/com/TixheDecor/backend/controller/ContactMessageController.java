package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.ContactMessage;
import com.TixheDecor.backend.service.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Contact Messages", description = "Menaxhimi i mesazheve nga contact page")
@RestController
@RequestMapping("/api/contact-messages")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    @Operation(summary = "Merr te gjitha mesazhet e kontaktit")
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<ContactMessage> getAll() {
        return contactMessageService.getAll();
    }

    @Operation(summary = "Merr mesazhin e kontaktit me ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ContactMessage> getById(@PathVariable Integer id) {
        return contactMessageService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Krijo mesazh kontakti")
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ContactMessage create(@RequestBody ContactMessage contactMessage) {
        return contactMessageService.create(contactMessage);
    }

    @Operation(summary = "Perditeso mesazhin e kontaktit")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ContactMessage> update(@PathVariable Integer id, @RequestBody ContactMessage contactMessage) {
        return contactMessageService.update(id, contactMessage)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Fshi mesazhin e kontaktit")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!contactMessageService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Mesazhi u fshi me sukses!");
    }
}
