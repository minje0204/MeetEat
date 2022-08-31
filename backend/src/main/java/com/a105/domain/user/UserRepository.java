package com.a105.domain.user;

import com.a105.domain.oauth2.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findByEmailAndProvider(String email, AuthProvider provider);
    Optional<User> findByEmail(String email);
}
