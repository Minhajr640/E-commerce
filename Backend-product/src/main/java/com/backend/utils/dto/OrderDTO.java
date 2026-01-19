package com.backend.utils.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.model.ProductReference;

import lombok.Data;


@Data
public class OrderDTO {
    
    private int orderId;
    private LocalDateTime orderDate;
    private boolean orderConfirmed;
    private double orderAmount;
    private String orderAddress;
    private LocalDateTime projectedDelivery;
    private String stripeSessionId;
    private List<ProductReference> orderedProducts;


}
