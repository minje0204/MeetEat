package com.a105.domain.friendship;

import com.a105.domain.friendship.Friendship;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FriendshipDto {

    private Long id;
    private Long friendId;
    private int status;
    private boolean received;
    private Long conferenceId;
    @QueryProjection
    public FriendshipDto(Long id, Long friendId, int status, boolean received){
        this.id = id;
        this.friendId = friendId;
        this.status = status;
        this.received = received;
    }

    @QueryProjection
    public FriendshipDto(Long id, Long friendId, int status, boolean received, Long conferenceId){
        this.id = id;
        this.friendId = friendId;
        this.status = status;
        this.received = received;
        this.conferenceId = conferenceId;
    }
}
