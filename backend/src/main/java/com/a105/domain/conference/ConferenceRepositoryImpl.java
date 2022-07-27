package com.a105.domain.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Conference> getActiveConferenceList(int restaurant){
        QConference conference = QConference.conference;
        List<Conference> conferenceList = jpaQueryFactory.selectFrom(conference)
                .where(conference.restaurant.eq(restaurant), conference.callEndTime.isNull())
                .fetch();
        return conferenceList;
    }

}
