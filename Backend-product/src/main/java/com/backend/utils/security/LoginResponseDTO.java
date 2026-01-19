package com.backend.utils.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor
public class LoginResponseDTO {

    private String jwtToken;
    private int customerId;
    private String message;
    
}
