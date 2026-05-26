package com.TixheDecor.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String emri;
    private String fullname;
    private String username;
}
