package com.a105.domain.conference;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long>, ConferenceRepositoryCustom {
    List<Conference> findByRestaurant(int restaurant);

    Optional<Conference> findById(Long idx);
}
