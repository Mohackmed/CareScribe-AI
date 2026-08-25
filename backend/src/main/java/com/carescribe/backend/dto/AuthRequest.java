package com.carescribe.backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String workerId;
    private String password;
}
