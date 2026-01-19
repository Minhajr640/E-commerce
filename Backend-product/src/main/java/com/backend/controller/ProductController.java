package com.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.Product;
// import com.backend.service.CategoryService;
import com.backend.service.ProductService;


@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    // private final CategoryService categoryService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    
    }


    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get product by id using ResponseEntity
    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) throws Exception {
        Product FoundProduct = productService.getProductById(id);
            return new ResponseEntity<>(FoundProduct, HttpStatus.OK);
    }

    // Create new product
    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // Update product
    @PostMapping("/update")
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    // Delete product
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }


    // Search products by name
    @GetMapping("/search/{name}")
    public List<Product> searchProductsByName(@PathVariable String name) {
        return productService.searchProductsByName(name);
    }

    // Get product by price range
    @GetMapping("/price-range/{minPrice}/{maxPrice}")
    public List<Product> getProductsByPriceRange(@PathVariable double minPrice, @PathVariable double maxPrice) {
        return productService.getProductsByPriceRange(minPrice, maxPrice);
    }

    // Get products with low stock
    @GetMapping("/last-chance/{amount}")
    public List<Product> getLowStockProducts(@PathVariable int amount) {
        return productService.getLowStockProducts(amount);
    }

    // Get latest products
    @GetMapping("/newest/{date}")
    public List<Product> getLatestProducts(@PathVariable String date) {
        return productService.getLatestProducts(date);
    }
    
    // Get products by gender
    @GetMapping("/products/{gender}")
    public List<Product> getProductsByGender(@PathVariable String gender) {
        return productService.getProductsByGender(gender);
    }

   @GetMapping("/category/{categoryName}")
    public List<Product> getProductsByCategory(@PathVariable String categoryName) {
    return productService.getProductsByCategory(categoryName);
    }


    
}
