package com.backend.model;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String f_name;
    private String l_name;
    private LocalDate birthdate;
    private String username;
    private String password;
    @ElementCollection
    @CollectionTable(name="customer_addresses", joinColumns = @JoinColumn(name = "customer_id"))
    private List<Addresses> customerAddresses = new LinkedList<>();
    @ElementCollection
    @CollectionTable(name = "customer_cart", joinColumns = @JoinColumn(name = "customer_id"))
    private List<ProductReference> cart = new LinkedList<>();

    @OneToMany(mappedBy="customer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Orders> orders = new LinkedList<>();

    public void addOrder(Orders order) {
    orders.add(order);
    order.setCustomer(this);
    }

    public void removeOrder(Orders order) {
    orders.remove(order);
    order.setCustomer(null);
}
    
}
