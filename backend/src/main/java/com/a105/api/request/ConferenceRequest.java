package com.a105.api.request;

import lombok.Getter;

@Getter
public class ConferenceRequest {
    Long hostId;
    String title;
    int maxUserNum;
    int restaurant;
    int position;
}
