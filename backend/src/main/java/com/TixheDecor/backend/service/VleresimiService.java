package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Vleresimi;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.VleresimiRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VleresimiService {

    @Autowired
    private VleresimiRepository vleresimiRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Vleresimi> getAll() {
        return vleresimiRepository.findAll();
    }

    public List<Vleresimi> getReviews() {
        return vleresimiRepository.findAllByOrderByDataVleresimitDescVleresimiIdDesc();
    }

    public Optional<Vleresimi> getById(Integer id) {
        return vleresimiRepository.findById(id);
    }

    public List<Vleresimi> getByProjekti(Integer projektiId) {
        return vleresimiRepository.findByProjektiProjektiId(projektiId);
    }

    public List<Vleresimi> getByKlienti(Integer klientiId) {
        return vleresimiRepository.findByKlientiKlientiId(klientiId);
    }

    public Vleresimi create(Vleresimi vleresimi) {
        resolveUser(vleresimi);
        if (vleresimi.getDataVleresimit() == null) {
            vleresimi.setDataVleresimit(LocalDate.now());
        }
        return vleresimiRepository.save(vleresimi);
    }

    public Vleresimi createFeedbackForUser(String email, Vleresimi vleresimi) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Perdoruesi nuk u gjet"));
        vleresimi.setUser(user);
        if (vleresimi.getDataVleresimit() == null) {
            vleresimi.setDataVleresimit(LocalDate.now());
        }
        return vleresimiRepository.save(vleresimi);
    }

    public Optional<Vleresimi> update(Integer id, Vleresimi vleresimi) {
        return vleresimiRepository.findById(id)
                .map(existing -> {
                    vleresimi.setVleresimiId(id);
                    resolveUser(vleresimi);
                    if (vleresimi.getUser() == null) {
                        vleresimi.setUser(existing.getUser());
                    }
                    if (vleresimi.getDataVleresimit() == null) {
                        vleresimi.setDataVleresimit(existing.getDataVleresimit());
                    }
                    return vleresimiRepository.save(vleresimi);
                });
    }

    public boolean delete(Integer id) {
        if (!vleresimiRepository.existsById(id)) {
            return false;
        }
        vleresimiRepository.deleteById(id);
        return true;
    }

    private void resolveUser(Vleresimi vleresimi) {
        if (vleresimi.getUser() == null || vleresimi.getUser().getEmail() == null) {
            return;
        }
        User user = userRepository.findByEmail(vleresimi.getUser().getEmail())
                .orElseThrow(() -> new RuntimeException("Perdoruesi nuk u gjet"));
        vleresimi.setUser(user);
    }
}
