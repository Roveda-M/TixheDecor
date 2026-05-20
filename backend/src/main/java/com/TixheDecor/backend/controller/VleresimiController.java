package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Vleresimi;
import com.TixheDecor.backend.repository.VleresimiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vleresimet")
@CrossOrigin(origins = "http://localhost:3000")
public class VleresimiController {

    @Autowired
    private VleresimiRepository vleresimiRepository;

    @GetMapping
    public List<Vleresimi> getAll() {
        return vleresimiRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vleresimi> getById(@PathVariable Integer id) {
        return vleresimiRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Vleresimi> getByProjekti(@PathVariable Integer projektiId) {
        return vleresimiRepository.findByProjektiProjektiId(projektiId);
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Vleresimi> getByKlienti(@PathVariable Integer klientiId) {
        return vleresimiRepository.findByKlientiKlientiId(klientiId);
    }

    @PostMapping
    public Vleresimi create(@RequestBody Vleresimi vleresimi) {
        return vleresimiRepository.save(vleresimi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vleresimi> update(@PathVariable Integer id, @RequestBody Vleresimi vleresimi) {
        if (!vleresimiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vleresimi.setVleresimiId(id);
        return ResponseEntity.ok(vleresimiRepository.save(vleresimi));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!vleresimiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vleresimiRepository.deleteById(id);
        return ResponseEntity.ok("Vleresimi u fshi me sukses!");
    }
}
