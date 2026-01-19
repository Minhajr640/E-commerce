package com.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.backend.model.Addresses;
import com.backend.model.Customer;
import com.backend.model.Orders;
import com.backend.model.ProductReference;
import com.backend.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.annotation.PostConstruct;


@Service
public class StripeService {
    
    //Value annotation to inject key value from Application.properties
    @Value("${stripe.api.key}")  
    private String stripeSecretKey;

    @Autowired
    CustomerService customerService;

    @Autowired
    ProductService productService;

    @Autowired
    OrderRepository orderRepo;

    //Assigning the secret key after bean is initialized but before it is used
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    //Passing in cart items and customerId as params to createCheckout session.
    public Map<String, String> createCheckoutSession(int customerId, List<ProductReference> checkoutCart, int selectedAddressIndex) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        String imageUrl = "http://localhost:8080/images/comingsoon.jpg";
        

        //The for loop is to loop through cart items and put them in Stripe format
        for (ProductReference item : checkoutCart) {
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()     //LineItem represents one product in cart
            .setPriceData(
                SessionCreateParams.LineItem.PriceData.builder()             //Building LineItem based on Stripes required format      
                .setCurrency("usd")
                .setUnitAmount((long) (item.getPrice() * 100)) 
                .setProductData(
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                    .setName(item.getName())
                    .setDescription(item.getDescription())
                    .addImage(imageUrl)
                    .build()
                )
            .build()
            )
            .setQuantity(1L)
            .build();

            lineItems.add(lineItem);
        }

        String productIds = checkoutCart.stream()
        .map(item -> String.valueOf(item.getId()))
        .collect(Collectors.joining(","));

        //Checkout Session Configuration rules to use 
        SessionCreateParams params = SessionCreateParams.builder()
        .addAllLineItem(lineItems)
        .setMode(SessionCreateParams.Mode.PAYMENT)      //Single type payment as opposed to subscription mondels.
        .setSuccessUrl("http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}")
        .setCancelUrl("http://localhost:3000/cart")
        .putMetadata("customerId", String.valueOf(customerId))
        .putMetadata("addressIndex", String.valueOf(selectedAddressIndex))
        .putMetadata("productIds", productIds)
        .build();

        Session session = Session.create(params);

        Map<String, String> result = new HashMap<>();
        result.put("sessionId", session.getId());
        result.put("url", session.getUrl());

        return result;
    }

    public Map<String, String> verifyAndProcessOrder(String sessionId, int customerId) throws StripeException{

        Optional<Orders> existingOrder = orderRepo.findByStripeSessionId(sessionId);
        if (existingOrder.isPresent()) {
        System.out.println("⚠️ Order already exists for session: " + sessionId);
        Orders order = existingOrder.get();
        String successMessage = "Order # " + order.getOrderId() + " is Successful.";
        String expectedDeliveryMessage = "Expected to deliver by " + order.getProjectedDelivery();
        
        Map<String, String> result = new HashMap<>();
        result.put("successMessage", successMessage);
        result.put("expectedDeliveryMessage", expectedDeliveryMessage);
        return result;
    }
        
        Session session = Session.retrieve(sessionId);
        Customer customer = customerService.getCustomerById(customerId);

        if(!"paid".equals(session.getPaymentStatus())) {
            throw new RuntimeException("Payment not completed");
        }

        String customerIdMetaData = session.getMetadata().get("customerId");
        if(!String.valueOf(customerId).equals(customerIdMetaData)) {
            throw new RuntimeException("Customer Id mismatch");
        }

        int addressIndex = Integer.parseInt(session.getMetadata().get("addressIndex"));
        Addresses orderAddress = customerService.getCustomerAddressByIndexAndCustomerId(addressIndex, customerId);

        
        String productIdsStr = session.getMetadata().get("productIds");
        String[] productIds = productIdsStr.split(",");
        List<ProductReference> orderedProducts = new ArrayList<>();
        List<ProductReference> customerCart = customer.getCart();
        for(int i = 0; i <productIds.length; i++) {
            try{
            ProductReference productReference = new ProductReference(productService.getProductById(Integer.valueOf(productIds[i])));
            orderedProducts.add(productReference);
            customerCart.remove(productReference);
            } catch (Exception e) {
                orderedProducts.add(productService.getErrorProductReference());
            }
        }



        Orders newOrder = new Orders();
        newOrder.setCustomer(customer);
        newOrder.setOrderAddress(orderAddress.toString());
        newOrder.setOrderAmount(session.getAmountTotal());
        newOrder.setOrderConfirmed(true);
        newOrder.setOrderDate(LocalDateTime.now());
        newOrder.setProjectedDelivery(LocalDateTime.now().plusDays(7));
        newOrder.setStripeSessionId(sessionId);
        newOrder.setOrderedProducts(orderedProducts);
        orderRepo.save(newOrder);

        List<Orders> customerOrders = customer.getOrders();
        customerOrders.add(0, newOrder);
        customer.setOrders(customerOrders);
        customerService.saveCustomer(customer);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String successMessage = "Order # " + newOrder.getOrderId() + " is Successful." ;
        String expectedDeliveryMessage = "Expected to deliver by " + newOrder.getProjectedDelivery().format(formatter);

        Map<String, String> newMap = new HashMap<>();
        newMap.put("successMessage", successMessage);
        newMap.put("expectedDeliveryMessage", expectedDeliveryMessage);
        return newMap;
    }
  
}
