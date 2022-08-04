package com.a105.api.request;

import com.a105.domain.friendship.Friendship;
import lombok.Getter;

@Getter
public class FriendshipRequest {
    Long id;

    public void updateFriend(Friendship friendship, int status){
        friendship.setStatus(status);
    }
}
