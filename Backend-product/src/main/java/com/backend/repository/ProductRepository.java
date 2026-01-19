package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    

    // Search products by name
    List<Product> findByNameContainingIgnoreCase(String name);

    // Get products with low stock
    List<Product> findByStockQuantityLessThan(int amount);


    // Get products created after a certain date
    List<Product> findByCreatedAtAfter(String date);

    // Get Products within a price range
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    //get products by gender
    List<Product> findByGender(String gender);

    //find products by category
    List<Product> findByCategoryName(String categoryName);




}
