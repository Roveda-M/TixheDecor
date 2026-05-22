package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fotografia;
import com.TixheDecor.backend.service.FotografiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fotografite")
@CrossOrigin(origins = "http://localhost:3000")
public class FotografiaController {

    @Autowired
    private FotografiaService fotografiaService;

    @GetMapping
    public List<Fotografia> getAll() {
        return fotografiaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fotografia> getById(@PathVariable Integer id) {
        return fotografiaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Fotografia> getByProjekti(@PathVariable Integer projektiId) {
        return fotografiaService.getByProjekti(projektiId);
    }

    @GetMapping("/lloji/{lloji}")
    public List<Fotografia> getByLloji(@PathVariable String lloji) {
        return fotografiaService.getByLloji(lloji);
    }

    @PostMapping
    public Fotografia create(@RequestBody Fotografia fotografia) {
        return fotografiaService.create(fotografia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fotografia> update(@PathVariable Integer id, @RequestBody Fotografia fotografia) {
        return fotografiaService.update(id, fotografia)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!fotografiaService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Fotografia u fshi me sukses!");
    }
}
