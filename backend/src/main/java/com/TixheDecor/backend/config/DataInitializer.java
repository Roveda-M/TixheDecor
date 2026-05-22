package com.TixheDecor.backend.config;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        seedRole("ROLE_ADMIN", "Administrator me qasje te plote");
        seedRole("ROLE_MANAGER", "Menaxher i operacioneve");
        seedRole("ROLE_USER", "Perdorues me qasje te kufizuar");
    }

    private void seedRole(String emertimi, String pershkrimi) {
        if (roleRepository.findByEmertimi(emertimi).isEmpty()) {
            Role role = new Role();
            role.setEmertimi(emertimi);
            role.setPershkrimi(pershkrimi);
            role.setNormalizedName(emertimi.toUpperCase());
            roleRepository.save(role);
        }
    }
}
