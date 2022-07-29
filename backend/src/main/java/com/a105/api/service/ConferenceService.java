package com.a105.api.service;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.domain.userConference.UserConferenceRepository;
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

    public List<ConferenceListResponse> getConferenceList(int restaurant) {
        List<ConferenceListResponse> list = new ArrayList<>();
        List<Conference> activeConferenceList = getActiveConferenceList(restaurant);
        for (Conference conference :
                activeConferenceList) {
            list.add(getConference(conference.getId()));
        }
        return list;
    }

    public List<Conference> getActiveConferenceList(int restaurant) {
        return conferenceRepository.getActiveConferenceList(restaurant);
    }

    public ConferenceListResponse getConference(Long id) {
        return ConferenceListResponse.fromEntity(getConferenceFromId(id), getCurrentUserNum(id));
    }

    public Conference getConferenceFromId(Long id) {
        return conferenceRepository.findById(id).orElseThrow();
    }

    public int getCurrentUserNum(Long conferenceId) {
        return userConferenceRepository.countCurrentUser(conferenceId);
    }

    public Conference createConference(ConferenceRequest conferenceRequest, int restaurant) {
        Conference conference = Conference.builder()
                .conferenceRequest(conferenceRequest)
                .restaurant(restaurant)
                .build();
        conferenceRepository.save(conference);
        return conference;
    }

    public boolean checkConferenceDuplicate(int restaurant, int position) {
        Conference conference = conferenceRepository.findByRestaurantAndPosition(restaurant, position);
        if (conference == null) return false;
        return conference.getCallEndTime() == null;
    }
}
