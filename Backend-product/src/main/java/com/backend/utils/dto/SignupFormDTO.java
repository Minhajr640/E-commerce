package com.backend.utils.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupFormDTO {

    @JsonProperty("fName")
    private String fName;
    @JsonProperty("lName")
    private String lName;
    private LocalDate birthdate;
    private String username;
    private String password;
   
}
