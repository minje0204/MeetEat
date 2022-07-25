package com.a105.domain.tray;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrayRepository extends JpaRepository<Tray, Long> {
}
