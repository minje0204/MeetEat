package com.a105.domain.userConference;

import com.a105.domain.userConference.UserConference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConferenceRepository extends JpaRepository<UserConference, Long>, UserConferenceRepositoryCustom {

}
