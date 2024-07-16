package com.ms.autenticacion.service;

import com.ms.autenticacion.repository.UserRepository;
import com.ms.autenticacion.model.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public String login(User user) {
        User existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return "Login successful";
        }
        return "Login failed";
    }
}
