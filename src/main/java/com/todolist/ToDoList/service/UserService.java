package com.todolist.ToDoList.service;

import com.todolist.ToDoList.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    User registerUser(User user);
    User loadUserByUsername(String username);
}
