package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.exception.InputErrorException;
import com.backend.exception.LoginFailedException;
import com.backend.model.Addresses;
import com.backend.service.CustomerService;
import com.backend.service.ProductService;
import com.backend.utils.dto.LoginDTO;
import com.backend.utils.dto.ProfileDTO;
import com.backend.utils.dto.SignupFormDTO;
import com.backend.utils.security.JWTGenerator;
import com.backend.utils.security.LoginResponseDTO;




@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    
    private CustomerService customerService;
    private ProductService productService;
    private JWTGenerator jwtGenerator;

    public CustomerController(CustomerService customerService, JWTGenerator jwtGenerator, ProductService productService) {
        this.customerService = customerService;
        this.jwtGenerator = jwtGenerator;
        this.productService = productService;
    }


    //login


    //signup
    @PostMapping("/sense/signup")
    public ResponseEntity<?> customerSignup(@RequestBody SignupFormDTO signupForm) {
        System.out.println(signupForm);
        try{
            customerService.customerSignup(signupForm);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(InputErrorException i) {
            return new ResponseEntity<>(i.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/sense/login")
    public ResponseEntity<?> customerLogin(@RequestBody LoginDTO loginData) {
        System.out.println(loginData);
        try{
            int customerId = customerService.loginAttempt(loginData);
            String token = jwtGenerator.generateToken(customerId);

            LoginResponseDTO loginResponse = new LoginResponseDTO(token, customerId, "Login Successful");
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (LoginFailedException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/sense/profile")
    public ResponseEntity<?> getProfileDTO() {
        System.out.println("Profile Get method called");
        Integer customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("customerId: " + customerId );
        ProfileDTO profile = customerService.getProfileByCustomerId(customerId);
        System.out.println("profileDTO"+profile);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PutMapping("profile/cart/add/{id}")
    public ResponseEntity<?> addToCart(@PathVariable int id) {
        int customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String message = productService.addItemToCart(id, customerId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("profile/cart/remove/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable int id ) {
        int customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
        String message = productService.removeItemFromCart(id, customerId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/profile/address/new")
    public ResponseEntity<Void> addNewAddress(@RequestBody Addresses newAddress) {
        int customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
        customerService.addNewAddress(newAddress, customerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
