package com.a105.api.service;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.domain.conference.Conference;
import com.a105.domain.conference.ConferenceRepository;
import com.a105.domain.userConference.UserConferenceRepository;
import com.a105.exception.BadRequestException;
import com.a105.exception.ResourceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConferenceService {

    private final UserConferenceService userConferenceService;
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
        return conferenceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", id));
    }

    public int getCurrentUserNum(Long conferenceId) {
        return userConferenceRepository.countCurrentUser(conferenceId);
    }

    public Conference createConference(ConferenceRequest conferenceRequest, Long userId,
        int restaurant) {
        if (checkConferenceDuplicate(restaurant,
            conferenceRequest.getPosition())) {
            throw new BadRequestException("해당 테이블을 이용할 수 없습니다");
        }
        Conference conference = Conference.builder()
            .conferenceRequest(conferenceRequest)
            .hostId(userId)
            .restaurant(restaurant)
            .build();
        conferenceRepository.save(conference);
        userConferenceService.joinConference(conference.getId(), userId);
        return conference;
    }

    public boolean checkConferenceDuplicate(int restaurant, int position) {
        Conference conference = conferenceRepository.findByRestaurantAndPosition(restaurant,
            position);
        if (conference == null) {
            return false;
        }
        return conference.getCallEndTime() == null;
    }

    public Conference joinConference(Long conferenceId, Long userId) {
        Conference conference = getConferenceFromId(conferenceId);
        if (conference == null || conference.getCallEndTime() != null) {
            throw new BadRequestException("종료된 테이블입니다.");
        }
        if (conference.getMaxUserNum() <= getCurrentUserNum(conferenceId)) {
            throw new BadRequestException("테이블에 빈 좌석이 없습니다.");
        }
        if (userConferenceService.checkUserConferenceDuplicate(conferenceId, userId)) {
            throw new BadRequestException("이미 이용중인 테이블입니다.");
        }
        userConferenceService.joinConference(conferenceId, userId);
        return conference;
    }
}
