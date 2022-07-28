package com.a105.domain.UserConference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserConferenceRepositoryImpl implements UserConferenceRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public int countCurrentUser(Long conferenceId) {
        QUserConference userConference = QUserConference.userConference;
        List<Long> result = jpaQueryFactory.select(userConference.count())
                .from(userConference)
                .where(userConference.conference.idx.eq(conferenceId), userConference.action.eq(0))
                .fetch();
        return Math.toIntExact(result.get(0));
    }

    @Override
    public List<UserConference> findByConferenceIdAndUserId(Long conferenceId, Long userId) {
        QUserConference userConference = QUserConference.userConference;
        List<UserConference> result = jpaQueryFactory.selectFrom(userConference)
                .where(userConference.conference.idx.eq(conferenceId), userConference.user.idx.eq(userId))
                .orderBy(userConference.idx.desc())
                .fetch();
        return result;
    }
}
