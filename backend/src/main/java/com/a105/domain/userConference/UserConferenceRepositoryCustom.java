package com.a105.domain.userConference;

import java.util.List;

public interface UserConferenceRepositoryCustom {

    int countCurrentUser(Long conferenceId);

    List<UserConference> findByConferenceIdAndUserId(Long conferenceId, Long userId);
}
