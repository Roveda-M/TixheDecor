package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Vleresimi;
import com.TixheDecor.backend.service.VleresimiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vleresimet")
@CrossOrigin(origins = "http://localhost:3000")
public class VleresimiController {

    @Autowired
    private VleresimiService vleresimiService;

    @GetMapping
    public List<Vleresimi> getAll() {
        return vleresimiService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vleresimi> getById(@PathVariable Integer id) {
        return vleresimiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Vleresimi> getByProjekti(@PathVariable Integer projektiId) {
        return vleresimiService.getByProjekti(projektiId);
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Vleresimi> getByKlienti(@PathVariable Integer klientiId) {
        return vleresimiService.getByKlienti(klientiId);
    }

    @PostMapping
    public Vleresimi create(@RequestBody Vleresimi vleresimi) {
        return vleresimiService.create(vleresimi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vleresimi> update(@PathVariable Integer id, @RequestBody Vleresimi vleresimi) {
        return vleresimiService.update(id, vleresimi)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!vleresimiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Vleresimi u fshi me sukses!");
    }
}
