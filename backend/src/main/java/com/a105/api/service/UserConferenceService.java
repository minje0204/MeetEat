package com.a105.api.service;

import com.a105.domain.UserConference.UserConference;
import com.a105.domain.UserConference.UserConferenceRepository;
import com.a105.domain.conference.ConferenceRepository;
import com.a105.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserConferenceService {

    private final UserConferenceRepository userConferenceRepository;
    private final UserRepository userRepository;
    private final ConferenceRepository conferenceRepository;

    @Transactional
    public UserConference joinConference(Long conferenceId, Long userId) {
        UserConference userConference = UserConference.builder()
                .conference(conferenceRepository.getReferenceById(conferenceId))
                .user(userRepository.getReferenceById(userId))
                .build();
        userConferenceRepository.save(userConference);
        return userConference;
    }

    public boolean checkUserConferenceDuplicate(Long conferenceId, Long userId) {
        List<UserConference> list = userConferenceRepository.findByConferenceIdAndUserId(conferenceId, userId);
        if (list.isEmpty() || list.get(0).getAction() != 0) return false;
        return true;
    }

    public void leaveConference(Long conferenceId, Long userId) {
        List<UserConference> list = userConferenceRepository.findByConferenceIdAndUserId(conferenceId,userId);
        UserConference userConference = list.get(0);
        userConference.setAction(1);
        userConferenceRepository.save(userConference);
    }
}
