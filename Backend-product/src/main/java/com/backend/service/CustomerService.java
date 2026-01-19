package com.backend.service;


import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.exception.CouldNotFindProfileException;
import com.backend.exception.InputErrorException;
import com.backend.exception.LoginFailedException;
import com.backend.model.Addresses;
import com.backend.model.Customer;
import com.backend.model.Orders;
import com.backend.model.ProductReference;
import com.backend.repository.CustomerRepository;
import com.backend.utils.dto.LoginDTO;
import com.backend.utils.dto.OrderDTO;
import com.backend.utils.dto.ProfileDTO;
import com.backend.utils.dto.SignupFormDTO;

@Service
public class CustomerService {

    private CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo=customerRepo;
    }

    public void customerSignup(SignupFormDTO signupForm) {
        if (signupForm.getFName() == null || signupForm.getFName().trim().isEmpty() ||
        signupForm.getLName() == null || signupForm.getLName().trim().isEmpty() ||
        signupForm.getBirthdate() == null ||
        signupForm.getUsername() == null || signupForm.getUsername().trim().isEmpty() ||
        signupForm.getPassword() == null || signupForm.getPassword().trim().isEmpty()) 
            {
                System.out.println("Worng inputs");
                throw new InputErrorException("Invalid Inputs");
            }
        if (customerRepo.findByUsername(signupForm.getUsername()).isPresent()) {
            System.out.println("Username exists");
            throw new InputErrorException("Username already exists");
        }
        try{
        Customer newCustomer = new Customer();
        newCustomer.setF_name(signupForm.getFName());
        newCustomer.setL_name(signupForm.getLName());
        newCustomer.setBirthdate(signupForm.getBirthdate());
        newCustomer.setUsername(signupForm.getUsername());
        newCustomer.setPassword(signupForm.getPassword());
        customerRepo.save(newCustomer);
        } catch(Exception e) {
            System.out.println("Catch block in signup service layer failed.");
            throw new InputErrorException("Username Exists");
        }
    }

    public int loginAttempt(LoginDTO loginData) {
        if(loginData.getUsername() == null || loginData.getUsername().trim().isEmpty() ||
            loginData.getPassword() == null || loginData.getPassword().trim().isEmpty() ) {
                System.out.println("Login info null");
            throw new LoginFailedException("Username and password are required");
            }
        Optional<Customer> customer = customerRepo.findByUsernameAndPassword(
        loginData.getUsername(), 
        loginData.getPassword()
        );
        
        int customerId = 0;

        if(customer.isPresent()) {
            customerId =  customer.get().getId();
        }
        return customerId;
    }

    public ProfileDTO getProfileByCustomerId(int customerId) {
        Customer customerProfile = customerRepo.getReferenceById(customerId);
        ProfileDTO profileToSend = new ProfileDTO();
        profileToSend.setFName(customerProfile.getF_name());
        profileToSend.setLName(customerProfile.getL_name());
        profileToSend.setBirthdate(customerProfile.getBirthdate());
        profileToSend.setCustomerAddresses(customerProfile.getCustomerAddresses());
        profileToSend.setCustomerOrders(getCustomerOrdersDTO(customerProfile.getOrders()));
        profileToSend.setUsername(customerProfile.getUsername());
        profileToSend.setCart(customerProfile.getCart());
        return profileToSend;
    }

    public List<OrderDTO> getCustomerOrdersDTO( List<Orders> orders) {
        List<OrderDTO> orderDTOs = new LinkedList<>();
        for(Orders order: orders) {
            if(order.isOrderConfirmed()) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setOrderId(order.getOrderId());
            orderDTO.setOrderDate(order.getOrderDate());
            orderDTO.setProjectedDelivery(order.getProjectedDelivery());
            orderDTO.setOrderAmount(order.getOrderAmount());
            orderDTO.setOrderAddress(order.getOrderAddress());
            orderDTO.setOrderedProducts(order.getOrderedProducts());
            orderDTOs.add(orderDTO);
            }
        }
        return orderDTOs;
    }
    
    public List<ProductReference> getCartById (int customerId) {
        Customer customerProfile = customerRepo.getReferenceById(customerId);
        if(customerProfile != null) {
        List<ProductReference> customerCart = customerProfile.getCart();
        return customerCart;
        } else {
            throw new CouldNotFindProfileException("Issue fetching your cart. Please Log out and try again.");
        }
    }

    public void addNewAddress(Addresses newAddress, int customerId) {
        Customer customer = customerRepo.getReferenceById(customerId);
        List<Addresses> customerAddresses = customer.getCustomerAddresses();
        if(customerAddresses.isEmpty() && newAddress.isDefaultAddress()) {
            customerAddresses.add(newAddress);
      
            
        } else if( newAddress.isDefaultAddress() && !customerAddresses.isEmpty()) {
            customerAddresses.add(0, newAddress);
   
        } else {
            customerAddresses.add(newAddress);
       
        }
        customerRepo.save(customer);
    }

    public Addresses getCustomerAddressByIndexAndCustomerId(int index, int customerId) {
        Customer customer = customerRepo.getReferenceById(customerId);
        List<Addresses> customerAddresses = customer.getCustomerAddresses();
        Addresses addressToReturn = customerAddresses.get(index);
        return addressToReturn;
    }

    public Customer getCustomerById(int customerId) {
        return customerRepo.getReferenceById(customerId);
    }

    public void saveCustomer(Customer customer) {
        customerRepo.save(customer);
    }

    public void removeItemFromCartByProductId(int productId,int customerId) {
        Customer customer = customerRepo.getReferenceById(customerId);
        List<ProductReference> customersCart = customer.getCart();
        for(ProductReference product : customersCart) {
            if(product.getId() == productId) {
                customersCart.remove(product);
            }
        }
    }
}
