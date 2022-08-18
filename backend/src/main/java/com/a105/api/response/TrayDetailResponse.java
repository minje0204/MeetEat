package com.a105.api.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class TrayDetailResponse {

    String conferenceTitle;

    String date;

    public static TrayDetailResponse of(String conferenceTitle, String date){
        return TrayDetailResponse.builder()
            .conferenceTitle(conferenceTitle)
            .date(date)
            .build();
    }

}
