package com.a105.domain.user;

import com.a105.domain.friendship.QFriendship;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public User findOneByNickname(String nickname){
        QUser user = QUser.user;
        return jpaQueryFactory.selectFrom(user)
            .where(user.nickname.eq(nickname))
            .fetchFirst();
    }

    @Override
    public List<UserSearchDto> search(Long userId, String email, String nickname){
        QUser user = QUser.user;
        QFriendship friendship = QFriendship.friendship;
        List<UserSearchDto> users = jpaQueryFactory.select(new QUserSearchDto(user.id, friendship.status.coalesce(-1)))
            .from(user)
                .leftJoin(friendship)
                .on((user.id.eq(friendship.senderId).and(friendship.receiverId.eq(userId)))
                    .or((user.id.eq(friendship.receiverId).and(friendship.senderId.eq(userId)))))
            .where(startsWithEmail(email), startsWithNickname(nickname))
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
