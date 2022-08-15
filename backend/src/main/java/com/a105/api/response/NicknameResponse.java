package com.a105.api.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class NicknameResponse {
    String nickname;
    Boolean exists;

    public static NicknameResponse of(String nickname, Boolean exists){
        return NicknameResponse.builder()
            .nickname(nickname)
            .exists(exists)
            .build();
    }
}
