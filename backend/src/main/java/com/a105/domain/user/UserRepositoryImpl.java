package com.a105.domain.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<User> findByEmail(String email) {
        QUser user = QUser.user;
        List<User> users = jpaQueryFactory.selectFrom(user)
                .where(user.email.contains(email))
                .fetch();
        return users;
    }

    @Override
    public List<User> findByNickname(String nickname) {
        QUser user = QUser.user;
        List<User> users = jpaQueryFactory.selectFrom(user)
                .where(user.nickname.contains(nickname))
                .fetch();
        return users;
    }
<<<<<<< HEAD
=======
    
>>>>>>> 50a256e374d7149f1289460e56078ef5e25654e1
}
