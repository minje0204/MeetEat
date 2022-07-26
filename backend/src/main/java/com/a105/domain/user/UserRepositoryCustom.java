package com.a105.domain.user;

import java.util.List;

public interface UserRepositoryCustom {

    List<User> findByEmail(String email);

    List<User> findByNickname(String nickname);


}
