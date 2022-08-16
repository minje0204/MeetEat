package com.a105.api.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class TrayItemResponse {
    String name;
    String type;
    String imageUrl;

    public static TrayItemResponse of(String key, String domain){

        String[] keyArr = key.split("/");
        String name = keyArr[2];
        String type = keyArr[1];
        String imageUrl = domain + key;

        return TrayItemResponse.builder()
            .name(name)
            .type(type)
            .imageUrl(imageUrl)
            .build();
    }
}
