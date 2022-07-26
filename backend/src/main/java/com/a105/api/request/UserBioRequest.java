package com.a105.api.request;

import com.a105.domain.user.User;
import lombok.Getter;

@Getter
public class UserBioRequest {
    String bio;

    public void updateUserBio(User user){
        user.setBio(this.bio);
    }
}
