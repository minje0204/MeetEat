package com.a105.domain.conference;

import java.util.List;

public interface ConferenceRepositoryCustom {

    List<Conference> getActiveConferenceList(int restaurant);
}
