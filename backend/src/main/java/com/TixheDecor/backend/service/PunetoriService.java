package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.PunetoriRepository;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class PunetoriService {

    @Autowired
    private PunetoriRepository punetoriRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[+\\d][+\\d\\s()-]{5,}$");

    public List<Punetori> getAll() {
        return punetoriRepository.findAll();
    }

    public Optional<Punetori> getById(Integer id) {
        return punetoriRepository.findById(id);
    }

    public List<Punetori> getByStatusi(String statusi) {
        return punetoriRepository.findByStatusi(statusi);
    }

    public Punetori create(Punetori punetori) {
        validate(punetori, null);
        normalize(punetori);
        Punetori saved = punetoriRepository.save(punetori);
        syncWorkerUser(saved);
        return saved;
    }

    public Optional<Punetori> update(Integer id, Punetori punetori) {
        if (!punetoriRepository.existsById(id)) {
            return Optional.empty();
        }
        validate(punetori, id);
        normalize(punetori);
        punetori.setPunetoriId(id);
        Punetori saved = punetoriRepository.save(punetori);
        syncWorkerUser(saved);
        return Optional.of(saved);
    }

    public boolean delete(Integer id) {
        if (!punetoriRepository.existsById(id)) {
            return false;
        }
        punetoriRepository.deleteById(id);
        return true;
    }

    private void validate(Punetori punetori, Integer currentId) {
        if (punetori.getEmail() == null || !EMAIL_PATTERN.matcher(punetori.getEmail().trim()).matches()) {
            throw new IllegalArgumentException("Emaili nuk eshte valid.");
        }
        if (punetori.getTelefoni() != null
                && !punetori.getTelefoni().isBlank()
                && !PHONE_PATTERN.matcher(punetori.getTelefoni().trim()).matches()) {
            throw new IllegalArgumentException("Telefoni nuk eshte valid.");
        }
        punetoriRepository.findByEmailIgnoreCase(punetori.getEmail().trim())
                .filter(existing -> currentId == null || !existing.getPunetoriId().equals(currentId))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException("Emaili ekziston tashme per nje punetor.");
                });
    }

    private void normalize(Punetori punetori) {
        punetori.setEmail(punetori.getEmail().trim().toLowerCase());
        if (punetori.getStatusi() == null || punetori.getStatusi().isBlank()) {
            punetori.setStatusi("aktiv");
        }
    }

    private void syncWorkerUser(Punetori punetori) {
        Role workerRole = roleRepository.findByNormalizedName("ROLE_WORKER")
                .orElseThrow(() -> new RuntimeException("Roli ROLE_WORKER nuk u gjet."));

        User user = userRepository.findByEmail(punetori.getEmail()).orElseGet(() -> {
            User created = new User();
            created.setEmail(punetori.getEmail());
            created.setPasswordHash(passwordEncoder.encode("worker123"));
            created.setDataKrijimit(LocalDateTime.now());
            created.setEmailConfirmed(true);
            return created;
        });

        user.setEmri(punetori.getEmri());
        user.setFullname(((punetori.getEmri() == null ? "" : punetori.getEmri()) + " "
                + (punetori.getMbiemri() == null ? "" : punetori.getMbiemri())).trim());
        user.setStatusi("jo aktiv".equalsIgnoreCase(punetori.getStatusi()) ? "Joaktiv" : "Aktiv");
        user.getRoles().add(workerRole);
        userRepository.save(user);
    }
}
