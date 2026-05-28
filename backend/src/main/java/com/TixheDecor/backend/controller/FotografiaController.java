package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fotografia;
import com.TixheDecor.backend.service.FotografiaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/fotografite")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Fotografite", description = "Menaxhimi i fotografive te projekteve")
public class FotografiaController {

    @Autowired
    private FotografiaService fotografiaService;

    @GetMapping
    @Operation(summary = "Merr te gjitha fotografite")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fotografia> getAll() {
        return fotografiaService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr fotografine me ID")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Fotografia> getById(@PathVariable Integer id) {
        return fotografiaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    @Operation(summary = "Merr fotografite sipas projektit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fotografia> getByProjekti(@PathVariable Integer projektiId) {
        return fotografiaService.getByProjekti(projektiId);
    }

    @GetMapping("/lloji/{lloji}")
    @Operation(summary = "Merr fotografite publike sipas llojit")
    public List<Fotografia> getByLloji(@PathVariable String lloji) {
        return fotografiaService.getByLloji(lloji);
    }

    @PostMapping
    @Operation(summary = "Krijo fotografi")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Fotografia create(@RequestBody Fotografia fotografia) {
        return fotografiaService.create(fotografia);
    }

    @PostMapping("/upload")
    @Operation(summary = "Ngarko fotografi")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Zgjidh nje foto per ngarkim."));
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Lejohen vetem fotografi."));
        }

        try {
            Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadDir);

            String originalName = file.getOriginalFilename() == null ? "foto" : file.getOriginalFilename();
            String extension = getSafeExtension(originalName);
            String fileName = UUID.randomUUID() + extension;
            Path target = uploadDir.resolve(fileName).normalize();

            if (!target.startsWith(uploadDir)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Emri i fotos nuk eshte valid."));
            }

            file.transferTo(target);
            return ResponseEntity.ok(Map.of("url", "/uploads/" + fileName));
        } catch (IOException error) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Foto nuk u ngarkua dot."));
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso fotografine")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Fotografia> update(@PathVariable Integer id, @RequestBody Fotografia fotografia) {
        return fotografiaService.update(id, fotografia)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi fotografine")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!fotografiaService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Fotografia u fshi me sukses!");
    }

    private String getSafeExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex < 0) {
            return ".jpg";
        }

        String extension = fileName.substring(dotIndex).toLowerCase();
        Set<String> allowed = Set.of(".jpg", ".jpeg", ".png", ".webp", ".gif");
        return allowed.contains(extension) ? extension : ".jpg";
    }
}
