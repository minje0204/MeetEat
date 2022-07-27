package com.a105.domain.UserConference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserConferenceRepositoryImpl implements UserConferenceRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public int countCurrentUser(Long conferenceIdx) {
        QUserConference userConference = QUserConference.userConference;
        List<Long> result = jpaQueryFactory.select(userConference.count())
                .from(userConference)
                .where(userConference.conferenceIdx.eq(conferenceIdx.intValue()), userConference.action.eq(0))
                .fetch();
        return Math.toIntExact(result.get(0));
    }
}
