package com.TixheDecor.backend.service;



import com.TixheDecor.backend.model.Klienti;

import com.TixheDecor.backend.repository.KlientiRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;



@Service

public class KlientiService {



    @Autowired

    private KlientiRepository klientiRepository;



    @Autowired

    private EventRequestKlientiSyncService eventRequestKlientiSyncService;

    @Autowired

    private EntityCascadeDeleteService entityCascadeDeleteService;



    public List<Klienti> getAll() {

        List<Klienti> klientet = klientiRepository.findAll();

        return withoutContactPageMessages(eventRequestKlientiSyncService.enrichKlientetForDashboard(klientet));

    }



    public Optional<Klienti> getById(Integer id) {

        return klientiRepository.findById(id);

    }



    public Klienti create(Klienti klienti) {

        return klientiRepository.save(klienti);

    }



    public Optional<Klienti> update(Integer id, Klienti klienti) {

        if (!klientiRepository.existsById(id)) {

            return Optional.empty();

        }

        klienti.setKlientiId(id);

        return Optional.of(klientiRepository.save(klienti));

    }



    @Transactional(rollbackFor = Exception.class)
    public boolean delete(Integer id) {

        if (!klientiRepository.existsById(id)) {

            return false;

        }

        entityCascadeDeleteService.deleteKlientiCascade(id);

        klientiRepository.deleteById(id);

        return true;

    }



    public List<Klienti> getByStatusi(String statusi) {

        return withoutContactPageMessages(eventRequestKlientiSyncService.enrichKlientetForDashboard(

                klientiRepository.findByStatusi(statusi)

        ));

    }

    private List<Klienti> withoutContactPageMessages(List<Klienti> klientet) {
        return klientet.stream()
                .filter(klienti -> klienti.getLloji() == null || !klienti.getLloji().toLowerCase().contains("kontakt"))
                .collect(Collectors.toList());
    }

}


