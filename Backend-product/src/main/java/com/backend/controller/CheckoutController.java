package com.backend.controller;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.backend.service.StripeService;
import com.backend.utils.dto.CheckoutRequestDTO;

@RestController
public class CheckoutController {
    
    private StripeService stripeService;

    public CheckoutController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    //Controller layer method to map the checkoutSession request.
    @PostMapping("checkout/create-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody CheckoutRequestDTO checkoutRequest) {
        try {
            Integer customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if(checkoutRequest.getCheckoutCart() == null || checkoutRequest.getCheckoutCart().isEmpty()) {
                return ResponseEntity.badRequest().body("Cart is empty");
            }

            Map<String, String> response = stripeService.createCheckoutSession(customerId, checkoutRequest.getCheckoutCart(), checkoutRequest.getSelectedAddressIndex());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error creating checkout session: " + e.getMessage());
        }
    }


    @PostMapping("/checkout/verify")
    public ResponseEntity<?> verifyCheckoutSession(@RequestBody Map<String, String> request) {
        try {
            System.out.println("Request: " + request);
            String sessionId = request.get("sessionId");
            Integer customerId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Map<String, String> message = stripeService.verifyAndProcessOrder(sessionId, customerId);
            System.out.println(message);
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Payment Verification Failed: " + e.getMessage());
        }
    }
}
