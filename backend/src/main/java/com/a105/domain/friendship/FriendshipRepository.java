package com.a105.domain.friendship;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long>, FriendshipRepositoryCustom {
    Optional<Friendship> findBySenderIdAndReceiverId(Long userId, Long friendId);
}
