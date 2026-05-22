package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.StockMovement;
import com.TixheDecor.backend.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockMovementService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    public List<StockMovement> getAll() {
        return stockMovementRepository.findAll();
    }

    public Optional<StockMovement> getById(Integer id) {
        return stockMovementRepository.findById(id);
    }

    public List<StockMovement> getByMateriali(Integer materialiId) {
        return stockMovementRepository.findByMaterialiMaterialiId(materialiId);
    }

    public List<StockMovement> getByTipi(String tipi) {
        return stockMovementRepository.findByTipi(tipi);
    }

    public StockMovement create(StockMovement stockMovement) {
        return stockMovementRepository.save(stockMovement);
    }

    public Optional<StockMovement> update(Integer id, StockMovement stockMovement) {
        if (!stockMovementRepository.existsById(id)) {
            return Optional.empty();
        }
        stockMovement.setMovementId(id);
        return Optional.of(stockMovementRepository.save(stockMovement));
    }

    public boolean delete(Integer id) {
        if (!stockMovementRepository.existsById(id)) {
            return false;
        }
        stockMovementRepository.deleteById(id);
        return true;
    }
}
