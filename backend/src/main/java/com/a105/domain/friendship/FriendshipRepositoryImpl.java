package com.a105.domain.friendship;

import com.a105.domain.userConference.QUserConference;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FriendshipRepositoryImpl implements FriendshipRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<FriendshipDto> findFriendshipDtos(Long userId){
        QFriendship friendship = QFriendship.friendship;
        QUserConference userConference = QUserConference.userConference;
        List<FriendshipDto> friendDtos = new ArrayList<>();

        // Received Requests
        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id, friendship.senderId, friendship.status, friendship.receiverId.eq(userId), userConference.conference.id))
            .from(friendship)
                .leftJoin(userConference)
                .on(friendship.senderId.eq(userConference.user.id), userConference.action.eq(0))
            .where(friendship.receiverId.eq(userId), friendship.status.eq(1))
            .fetch());

        // Sent Requests
        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id, friendship.receiverId, friendship.status, friendship.receiverId.eq(userId), userConference.conference.id))
            .from(friendship)
                .leftJoin(userConference)
                .on(friendship.receiverId.eq(userConference.user.id), userConference.action.eq(0))
            .where(friendship.senderId.eq(userId), friendship.status.eq(1))
            .fetch());

        return friendDtos;
    }


    @Override
    public List<FriendshipDto> findReceivedRequests(Long userId){
        QFriendship friendship = QFriendship.friendship;

        List<FriendshipDto> friendDtos = new ArrayList<>();

        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id,
            friendship.senderId, friendship.status, friendship.receiverId.eq(userId)))
            .from(friendship)
            .where(friendship.receiverId.eq(userId), friendship.status.eq(0))
            .fetch());
        return friendDtos;
    }

    @Override
    public List<FriendshipDto> findSentRequests(Long userId){
        QFriendship friendship = QFriendship.friendship;

        List<FriendshipDto> friendDtos = new ArrayList<>();

        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id,
            friendship.receiverId, friendship.status, friendship.receiverId.eq(userId)))
            .from(friendship)
            .where(friendship.senderId.eq(userId), friendship.status.eq(0))
            .fetch());
        return friendDtos;
    }

    @Override
    public FriendshipDto converToDto(Long userId, Long id){
        QFriendship friendship = QFriendship.friendship;

        FriendshipDto ifSent = jpaQueryFactory.select(new QFriendshipDto(friendship.id,
            friendship.receiverId, friendship.status, friendship.receiverId.eq(userId)))
        .from(friendship)
            .where(friendship.id.eq(id)).fetch().get(0);

        FriendshipDto ifReceived = jpaQueryFactory.select(new QFriendshipDto(friendship.id,
                friendship.receiverId, friendship.status, friendship.receiverId.eq(userId)))
            .from(friendship)
            .where(friendship.id.eq(id)).fetch().get(0);

        return ifSent != null ? ifSent : ifReceived;
    }
}
