package com.a105.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    boolean existsByNickname(String nickname);
    User findByEmailAndProvider(String email, AuthProvider provider);

    User findByEmail(String email);
}
