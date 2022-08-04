package com.a105.domain.friendship;

import java.util.List;

public interface FriendshipRepositoryCustom {
    public List<FriendshipDto> findFriendDtos(Long id);
}
