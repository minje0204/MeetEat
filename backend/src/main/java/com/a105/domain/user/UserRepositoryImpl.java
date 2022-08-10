package com.a105.domain.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<User> searchByEmail(String email) {
        QUser user = QUser.user;
        List<User> users = jpaQueryFactory.selectFrom(user)
            .where(user.email.contains(email))
            .fetch();
        return users;
    }

    @Override
    public List<User> searchByNickname(String nickname) {
        QUser user = QUser.user;
        List<User> users = jpaQueryFactory.selectFrom(user)
            .where(user.nickname.contains(nickname))
            .fetch();
        return users;
    }
}
