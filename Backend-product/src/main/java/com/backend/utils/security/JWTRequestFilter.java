package com.backend.utils.security;

import java.util.ArrayList;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    private JWTGenerator jwtGenerator;

    public JWTRequestFilter(JWTGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

     @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        boolean skip = path.startsWith("/sense/login") || 
                       path.startsWith("/categories") || 
                       path.startsWith("/products") ||
                       path.startsWith("/sense/signup");
        return skip;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        final String authorizationHandler = request.getHeader("Authorization");


        Integer customerId = null;
        String jwtToken = null;

        if (authorizationHandler != null && authorizationHandler.startsWith("Bearer ")) {
            jwtToken = authorizationHandler.substring(7);
            try {
                customerId = jwtGenerator.extractCustomerId(jwtToken);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }



        if(customerId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if(!jwtGenerator.isTokenExpired(jwtToken)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                new UsernamePasswordAuthenticationToken(customerId, null, new ArrayList<>());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
