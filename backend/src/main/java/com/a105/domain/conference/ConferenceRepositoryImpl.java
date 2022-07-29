package com.a105.domain.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Conference> getActiveConferenceList(int restaurant) {
        QConference conference = QConference.conference;
        List<Conference> conferenceList = jpaQueryFactory.selectFrom(conference)
                .where(conference.restaurant.eq(restaurant), conference.callEndTime.isNull())
                .fetch();
        return conferenceList;
    }

    @Override
    public Conference findByRestaurantAndPosition(int restaurant, int position) {
        QConference conference = QConference.conference;
        List<Conference> conferenceList = jpaQueryFactory.selectFrom(conference)
                .where(conference.restaurant.eq(restaurant), conference.position.eq(position))
                .orderBy(conference.id.desc())
                .fetch();
        if (conferenceList.isEmpty()) return null;
        return conferenceList.get(0);
    }

}
