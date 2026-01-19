package com.backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Addresses {

    private String addressNickname;
    private String street;
    private String city;
    private String state;
    private String zipcode;
    private String country;
    private boolean defaultAddress;
    
    @Override
    public String toString() {
        return addressNickname + ": " + street + ", " + city + ", " + state + " " + zipcode;
    }
}
