package com.a105.api.request;

import com.a105.domain.user.User;
import lombok.Getter;

@Getter
public class UserNicknameRequest {

    String nickname;

    public void updateUserNickname(User user) {
        user.setNickname(this.nickname);
    }
}
