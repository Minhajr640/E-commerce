package com.backend.utils.dto;

import java.time.LocalDate;
import java.util.List;

import com.backend.model.Addresses;
import com.backend.model.ProductReference;

import lombok.Data;

@Data
public class ProfileDTO {
    private String fName;
    private String lName;
    private LocalDate birthdate;
    private List<Addresses> customerAddresses;
    private String username;
    private List<ProductReference> cart; 
    private List<OrderDTO> customerOrders;
}
