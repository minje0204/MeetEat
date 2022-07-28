package com.a105.domain.UserConference;

import java.util.List;

public interface UserConferenceRepositoryCustom {

    int countCurrentUser(Long conferenceIdx);

    List<UserConference> findByConferenceIdAndUserId(Long conferenceId, Long userId);
}
