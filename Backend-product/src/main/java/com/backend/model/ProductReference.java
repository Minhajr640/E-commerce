package com.backend.model;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductReference {
    

    private int id;
    private String name;
    private double price;
    private String description;
    private String gender;
    private String imageUrl;

    public ProductReference(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.gender = product.getGender();
        this.imageUrl = product.getImageUrl();
    }

}
