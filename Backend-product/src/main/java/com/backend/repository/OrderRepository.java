package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.model.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer>{
    
    Optional<Orders> findByStripeSessionId(String stripeSessionId);
    boolean existsByStripeSessionId(String stripeSessionId);
    
}
