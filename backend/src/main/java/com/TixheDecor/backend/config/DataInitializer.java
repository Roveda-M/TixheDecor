package com.TixheDecor.backend.config;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    public DataInitializer(RoleRepository roleRepository, UserRoleRepository userRoleRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public void run(String... args) {
        seedRole("ROLE_ADMIN", "Administrator me qasje te plote");
        seedRole("ROLE_MANAGER", "Menaxher me qasje ne operacionet e biznesit");
        seedRole("ROLE_WORKER", "Punetor me qasje ne detyrat e veta");
        seedRole("ROLE_USER", "Perdorues me qasje te kufizuar");
        removeUnsupportedRoles();
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

    private void removeUnsupportedRoles() {
        Set<String> allowed = Set.of("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_WORKER");
        roleRepository.findAll().stream()
                .filter(role -> !allowed.contains((role.getEmertimi() == null ? "" : role.getEmertimi()).toUpperCase()))
                .forEach(role -> {
                    userRoleRepository.deleteAll(userRoleRepository.findByRoleId(role.getId()));
                    roleRepository.delete(role);
                });
    }
}
