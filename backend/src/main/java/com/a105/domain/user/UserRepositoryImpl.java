package com.a105.domain.user;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Boolean findOneByNickname(String nickname){
        QUser user = QUser.user;
        Integer exists = jpaQueryFactory.selectOne()
            .from(user)
            .where(user.nickname.eq(nickname))
            .fetchFirst();

        return exists != null;
    }

    @Override
    public List<User> search(String email, String nickname){
        QUser user = QUser.user;
        List<User> users = jpaQueryFactory.selectFrom(user)
            .where(startsWithEmail(email), startsWithNickname(nickname))
            .fetch();
        return users;
    }

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

    private BooleanExpression startsWithEmail(String email){
        QUser user = QUser.user;
        if(StringUtils.isEmpty(email)){
            return null;
        }
        return user.email.startsWith(email);
    }

    private BooleanExpression startsWithNickname(String nickname){
        QUser user = QUser.user;
        if(StringUtils.isEmpty(nickname)){
            return null;
        }
        return user.nickname.startsWith(nickname);
    }
}
