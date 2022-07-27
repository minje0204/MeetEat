package com.a105.api.response;

import com.a105.domain.conference.Conference;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ConferenceListResponse {
    private Long idx; //회의 인덱스

    private String title;

    private int maxUserNum;

    private int currentUserNum;

    private int tableNum;

    public static ConferenceListResponse fromEntity(Conference conference, int currentUserNum){
        return ConferenceListResponse.builder()
                .idx(conference.getIdx())
                .title(conference.getTitle())
                .maxUserNum(conference.getMaxUserNum())
                .currentUserNum(currentUserNum)
//                .tableNum(conference.getTableNum())
                .build();
    }
}
