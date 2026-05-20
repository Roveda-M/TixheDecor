package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fotografia;
import com.TixheDecor.backend.repository.FotografiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fotografite")
@CrossOrigin(origins = "http://localhost:3000")
public class FotografiaController {

    @Autowired
    private FotografiaRepository fotografiaRepository;

    @GetMapping
    public List<Fotografia> getAll() {
        return fotografiaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fotografia> getById(@PathVariable Integer id) {
        return fotografiaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Fotografia> getByProjekti(@PathVariable Integer projektiId) {
        return fotografiaRepository.findByProjektiProjektiId(projektiId);
    }

    @GetMapping("/lloji/{lloji}")
    public List<Fotografia> getByLloji(@PathVariable String lloji) {
        return fotografiaRepository.findByLloji(lloji);
    }

    @PostMapping
    public Fotografia create(@RequestBody Fotografia fotografia) {
        return fotografiaRepository.save(fotografia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fotografia> update(@PathVariable Integer id, @RequestBody Fotografia fotografia) {
        if (!fotografiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        fotografia.setFotografiaId(id);
        return ResponseEntity.ok(fotografiaRepository.save(fotografia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!fotografiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        fotografiaRepository.deleteById(id);
        return ResponseEntity.ok("Fotografia u fshi me sukses!");
    }
}
