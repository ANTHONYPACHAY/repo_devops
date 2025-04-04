package com.ms.autenticacion.service;

import com.ms.autenticacion.repository.UserRepository;
import com.ms.autenticacion.model.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public User register(User user) {
        return userRepository.save(user);
    }

    public String login(User user) {
        User existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            String token = generateToken(existingUser);
            return "{ \"username\": \"" + existingUser.getUserName() + "\", \"token\": \"" + token + "\" }";
        }

        return "{ \"error\": \"Login failed\" }";
    }

    private String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUserName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600_000)) // 1 hora
                .signWith(SECRET_KEY)
                .compact();
    }
}
