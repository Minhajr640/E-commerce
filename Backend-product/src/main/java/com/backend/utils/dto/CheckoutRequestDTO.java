package com.backend.utils.dto;

import java.util.List;

import com.backend.model.ProductReference;

import lombok.Data;

@Data
public class CheckoutRequestDTO {

    private List<ProductReference> checkoutCart;
    private int selectedAddressIndex;
    
}
