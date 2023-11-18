package com.unihack.myedoctor.repository;

import com.unihack.myedoctor.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
//    User updateUserById(String userId, User user);
    User findUserByUserId(String userId);
}
