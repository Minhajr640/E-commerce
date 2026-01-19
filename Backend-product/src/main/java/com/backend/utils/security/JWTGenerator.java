package com.backend.utils.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.security.Key;


import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;


@Component
public class JWTGenerator {
    
    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long EXPIRATION_TIME = 86400000;




    public String generateToken(int customerId) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, String.valueOf(customerId));
    }
    //String.valueOf(customerId) becomes customer Id in the following method
    public String createToken(Map<String, Object> claims, String subject) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(now + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }


    public Integer extractCustomerId(String token) {
        return Integer.parseInt(extractClaim(token, Claims::getSubject));
    }
    private <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }   
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }


    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean ValidateToken(String token, int customerId) {
        final Integer extractCustomerId = extractCustomerId(token);
        return (extractCustomerId == customerId && !isTokenExpired(token));
    }

    










}
