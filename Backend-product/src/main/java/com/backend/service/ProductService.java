package com.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.model.Customer;
import com.backend.model.Product;
import com.backend.model.ProductReference;
import com.backend.repository.CustomerRepository;
import com.backend.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private CustomerRepository customerRepository;

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by id throw global exception if not found
    public Product getProductById(int id) throws Exception {
        Product foundProduct = productRepository.findById(id).orElse(null); 
        if (foundProduct == null) {
            throw new Exception("Product not found with id: " + id);
        } else {
            return foundProduct;
        } 
    }

    // Create new product 
    // More logic has to be added here based on which fields are mandatory for prouct creation
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Update product
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    // Delete product   
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }


    // Search products by name
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // Update stock quantity

    
    // Get products by price range
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // Get low stock products   
    public List<Product> getLowStockProducts(int amount) {
        return productRepository.findByStockQuantityLessThan(amount);
    }

    // Get latest products
    public List<Product> getLatestProducts(String date) {
        return productRepository.findByCreatedAtAfter(date);
    }

    public List<Product> getProductsByGender(String gender) {
    return productRepository.findByGender(gender);
    }

   public List<Product> getProductsByCategory(String categoryName) {
    return productRepository.findByCategoryName(categoryName);
}

   public String addItemToCart(int productId, int customerId) throws NullPointerException{
    try{
    Product product = productRepository.getReferenceById(productId);
    Customer customer = customerRepository.getReferenceById(customerId);
    if(customer.getCart() == null) {
        customer.setCart(new ArrayList<ProductReference>());
    }
    List<ProductReference> customerCart = customer.getCart();

    if(product!=null && product.getStockQuantity() > 0) {
        ProductReference productForCart = new ProductReference();
        productForCart.setId(product.getId());
        productForCart.setDescription(product.getDescription());
        productForCart.setGender(product.getGender());
        productForCart.setImageUrl(product.getImageUrl());
        productForCart.setPrice(product.getPrice());
        productForCart.setName(product.getName());
        customerCart.add(productForCart);
        customer.setCart(customerCart);
        customerRepository.save(customer);
    }
    return "success";
    }  catch(Exception e) {
        e.printStackTrace(); //for debugging 
        return e.getMessage();
    }

   }

   public String removeItemFromCart(int productId, int customerId) {
    try{
    Customer customer = customerRepository.getReferenceById(customerId);
    List<ProductReference> cart = customer.getCart();
    if (cart == null || cart.isEmpty()) {
        return "Cart is empty";
    }
    boolean removed = cart.removeIf(item -> item.getId() == productId);
    if(removed) {
        customer.setCart(cart);
        customerRepository.save(customer);
        return "Successfully removed";
    } else {
        return"item not found";
    }
    } catch (Exception e) {
        e.printStackTrace();
        return "Error removing item";
    } 
   }

   public ProductReference getErrorProductReference() {
    String imageUrl = "http://localhost:8080/images/errorproductimage";
    ProductReference errorProduct = new ProductReference();
    errorProduct.setName("Error Fetching Product");
    errorProduct.setDescription("Error");
    errorProduct.setGender("Error");
    errorProduct.setId(000000000001);
    errorProduct.setImageUrl(imageUrl);
    errorProduct.setPrice(0.00);

    return errorProduct;
   }


    
}
