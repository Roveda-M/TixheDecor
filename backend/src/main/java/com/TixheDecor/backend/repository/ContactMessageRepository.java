package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Integer> {
    List<ContactMessage> findAllByOrderByCreatedAtDescContactMessageIdDesc();
}
