package com.TixheDecor.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDto {
    private Long id;
    private String email;
    private String emri;
    private String mbiemri;
    private String fullname;
    private String phoneNumber;
    private String statusi;
}
