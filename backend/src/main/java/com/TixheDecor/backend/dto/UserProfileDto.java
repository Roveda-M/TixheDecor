package com.TixheDecor.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDto {
    private Long id;
    private String email;
    private String fullname;
    private String username;
    private String statusi;
}
