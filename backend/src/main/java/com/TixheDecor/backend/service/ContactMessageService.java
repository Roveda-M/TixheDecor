package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.ContactMessage;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.ContactMessageRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ContactMessage> getAll() {
        return contactMessageRepository.findAllByOrderByCreatedAtDescContactMessageIdDesc();
    }

    public Optional<ContactMessage> getById(Integer id) {
        return contactMessageRepository.findById(id);
    }

    public ContactMessage create(ContactMessage contactMessage) {
        fillPhoneFromUser(contactMessage);
        if (contactMessage.getCreatedAt() == null) {
            contactMessage.setCreatedAt(LocalDateTime.now());
        }
        if (contactMessage.getStatusi() == null || contactMessage.getStatusi().isBlank()) {
            contactMessage.setStatusi("I ri");
        }
        return contactMessageRepository.save(contactMessage);
    }

    public Optional<ContactMessage> update(Integer id, ContactMessage contactMessage) {
        return contactMessageRepository.findById(id)
                .map(existing -> {
                    contactMessage.setContactMessageId(id);
                    if (contactMessage.getCreatedAt() == null) {
                        contactMessage.setCreatedAt(existing.getCreatedAt());
                    }
                    if (contactMessage.getStatusi() == null || contactMessage.getStatusi().isBlank()) {
                        contactMessage.setStatusi(existing.getStatusi());
                    }
                    fillPhoneFromUser(contactMessage);
                    return contactMessageRepository.save(contactMessage);
                });
    }

    public boolean delete(Integer id) {
        if (!contactMessageRepository.existsById(id)) {
            return false;
        }
        contactMessageRepository.deleteById(id);
        return true;
    }

    private void fillPhoneFromUser(ContactMessage contactMessage) {
        if (contactMessage.getPhoneNumber() != null && !contactMessage.getPhoneNumber().isBlank()) {
            return;
        }
        if (contactMessage.getEmail() == null || contactMessage.getEmail().isBlank()) {
            return;
        }
        userRepository.findByEmail(contactMessage.getEmail())
                .map(User::getPhoneNumber)
                .filter(phone -> phone != null && !phone.isBlank())
                .ifPresent(contactMessage::setPhoneNumber);
    }
}
