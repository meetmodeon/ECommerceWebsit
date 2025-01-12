package com.codeWithProject.ecom.repository;

import com.codeWithProject.ecom.entity.User;
import com.codeWithProject.ecom.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findFirstByEmail(String username);

    User findByUserRole(UserRole userRole);
}
