package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.StockMovement;
import com.TixheDecor.backend.service.StockMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-movements")
@CrossOrigin(origins = "http://localhost:3000")
public class StockMovementController {

    @Autowired
    private StockMovementService stockMovementService;

    @GetMapping
    public List<StockMovement> getAll() {
        return stockMovementService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockMovement> getById(@PathVariable Integer id) {
        return stockMovementService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/materiali/{materialiId}")
    public List<StockMovement> getByMateriali(@PathVariable Integer materialiId) {
        return stockMovementService.getByMateriali(materialiId);
    }

    @GetMapping("/tipi/{tipi}")
    public List<StockMovement> getByTipi(@PathVariable String tipi) {
        return stockMovementService.getByTipi(tipi);
    }

    @PostMapping
    public StockMovement create(@RequestBody StockMovement stockMovement) {
        return stockMovementService.create(stockMovement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockMovement> update(@PathVariable Integer id, @RequestBody StockMovement stockMovement) {
        return stockMovementService.update(id, stockMovement)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!stockMovementService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Levizja e stokut u fshi me sukses!");
    }
}
