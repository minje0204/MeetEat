package com.a105.api.service;

import com.a105.api.response.ConferenceListResponse;
import com.a105.domain.UserConference.UserConferenceRepository;
import com.a105.domain.conference.Conference;
import com.a105.domain.conference.ConferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;

    private final UserConferenceRepository userConferenceRepository;

    public List<ConferenceListResponse> getConferenceList(int restaurant){
        List<ConferenceListResponse> list = new ArrayList<>();
        List<Conference> activeConferenceList = getActiveConferenceList(restaurant);
        for (Conference conference:
              activeConferenceList) {
            list.add(getConference(conference.getIdx()));
        }
        return list;
    }

    public List<Conference> getActiveConferenceList(int restaurant){
        return conferenceRepository.getActiveConferenceList(restaurant);
    }

    public ConferenceListResponse getConference(Long idx){
        return ConferenceListResponse.fromEntity(getConferenceFromIdx(idx),getCurrentUserNum(idx));
    }

    public Conference getConferenceFromIdx(Long idx){
        return conferenceRepository.findById(idx).orElseThrow();
    }

    public int getCurrentUserNum(Long conferenceIdx){
        return userConferenceRepository.countCurrentUser(conferenceIdx);
    }
}
