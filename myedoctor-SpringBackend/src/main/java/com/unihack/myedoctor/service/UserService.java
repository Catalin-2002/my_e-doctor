package com.unihack.myedoctor.service;

import com.unihack.myedoctor.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User updateUserById(String userId, User user);
    void deleteUser(String userId);
    List<User> getAllUsers();
}
