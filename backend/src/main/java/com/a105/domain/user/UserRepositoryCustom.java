package com.a105.domain.user;

import java.util.List;

public interface UserRepositoryCustom {

    User findOneByNickname(String nickname);

    List<UserSearchDto> search(Long userId, String email, String nickname);

}
