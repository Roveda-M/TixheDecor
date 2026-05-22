package com.TixheDecor.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String emri;
    private String mbiemri;
    private String phoneNumber;
    private String role;
    private Boolean statusi;
}
