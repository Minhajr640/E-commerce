package com.backend.utils.security;

import org.springframework.security.config.Customizer;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class CorsConfig {

    private JWTRequestFilter jwtRequestFilter;

    public CorsConfig(JWTRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())               //Disabling CSRF -- Cross site request forgery* 
            .cors(Customizer.withDefaults())            //Enable CORS since my frontend is sending request from a different origin(port 5173)
            .authorizeHttpRequests(auth -> auth         //setting up the CORS filter
                .requestMatchers("/sense/login").permitAll()   //Exposing public requests
                .requestMatchers("/sense/signup").permitAll()
                .requestMatchers("/categories/**").permitAll()
                .requestMatchers("/products/**").permitAll()
                .requestMatchers("/categories").permitAll()
                .requestMatchers("/products").permitAll()
                .requestMatchers("/images/**").permitAll() 
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //stateless- server wont store the sessions
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // Adding my jwtRequestFilter before the username & 
        return http.build();                                                                // password filter which is springs default security filter.
    }

    //Setting up CORS communication rules
    @Bean 
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "*")); // "*" included for my image requests */
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        return new UrlBasedCorsConfigurationSource() {{
            registerCorsConfiguration("/**", config);
        }};
    }
} 


