package com.a105.domain.friendship;

import com.a105.domain.friendship.QFriendshipDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FriendshipRepositoryImpl implements FriendshipRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<FriendshipDto> findFriendDtos(Long id){
        QFriendship friendship = QFriendship.friendship;

        List<FriendshipDto> friendDtos = new ArrayList<>();

        // Received Requests
        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id, friendship.userId, friendship.status, friendship.friendId.eq(id)))
            .from(friendship)
            .where(friendship.friendId.eq(id)
                .and(friendship.status.eq(1)))
            .fetch());

        // Sent Requests
        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id, friendship.friendId, friendship.status, friendship.friendId.eq(id)))
            .from(friendship)
            .where(friendship.userId.eq(id)
                .and(friendship.status.eq(1)))
            .fetch());

        return friendDtos;
    }

    public List<FriendshipDto> findReceivedRequests(Long id){
        QFriendship friendship = QFriendship.friendship;

        List<FriendshipDto> friendDtos = new ArrayList<>();

        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id,
            friendship.userId, friendship.status, friendship.friendId.eq(id))).from(friendship).where(friendship.friendId.eq(id).and(friendship.status.eq(0))).fetch());
        return friendDtos;
    }

    public List<FriendshipDto> findSentRequests(Long id){
        QFriendship friendship = QFriendship.friendship;

        List<FriendshipDto> friendDtos = new ArrayList<>();

        friendDtos.addAll(jpaQueryFactory.select(new QFriendshipDto(friendship.id,
            friendship.friendId, friendship.status, friendship.friendId.eq(id))).from(friendship).where(friendship.userId.eq(id).and(friendship.status.eq(0))).fetch());
        return friendDtos;
    }



//    @Override
//    public List<Object> findAllFriend(Long id) {
//        return null;
//    }
//
//    @Override
//    public List<Tuple> searchFriendByEmail(Long id, String email){
//        QUser user = QUser.user;
//        QFriendship friendship = QFriendship.friendship;
//
//        List<Tuple> list =
////            jpaQueryFactory.select(user.nickname, friendship.userId, friendship.friendId,friendship.status)
//        jpaQueryFactory.select(Projections.constructor(FriendResponse.class), user.nickname, friendship.userId, friendship.friendId,friendship.status)
//                .from(user, friendship)
//                .where(user.email.contains(email).and(
//                    (user.id.eq(friendship.userId).and(friendship.friendId.eq(id))
//                        .or((user.id.eq(friendship.friendId)).and(friendship.userId.eq(id))))))
//                .fetch();
//
////        List<Friendship> friends = jpaQueryFactory.selectFrom(frie)
////            .where((user.id.in(
////                (JPAExpressions.select(friendship.userId).from(friendship)
////                    .where(friendship.friendId.eq(id)))
////            )).or(user.id.in(
////                (JPAExpressions.select(friendship.friendId).from(friendship).where(friendship.userId.eq(id)))
////            ))).fetch();
////
////        return friends;
//        return list;
//    }
}
