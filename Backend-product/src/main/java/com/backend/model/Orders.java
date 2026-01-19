package com.backend.model;



import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders") 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;
    private LocalDateTime orderDate;
    private boolean orderConfirmed;
    private double orderAmount;
    private String orderAddress;
    private LocalDateTime projectedDelivery;
    private String stripeSessionId;
    @ElementCollection
    @CollectionTable(name = "ordered_products", joinColumns = @JoinColumn(name = "order_id"))
    private List<ProductReference> orderedProducts;

    @ManyToOne
    @JoinColumn(name="customer_id")
    @JsonBackReference
    private Customer customer;

}
