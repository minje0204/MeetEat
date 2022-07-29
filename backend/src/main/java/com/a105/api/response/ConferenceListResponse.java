package com.a105.api.response;

import com.a105.domain.conference.Conference;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ConferenceListResponse {
    private Long id;

    private String title;

    private int maxUserNum;

    private int currentUserNum;

    private int position;

    public static ConferenceListResponse fromEntity(Conference conference, int currentUserNum) {
        return ConferenceListResponse.builder()
                .id(conference.getId())
                .title(conference.getTitle())
                .maxUserNum(conference.getMaxUserNum())
                .currentUserNum(currentUserNum)
                .position(conference.getPosition())
                .build();
    }
}
