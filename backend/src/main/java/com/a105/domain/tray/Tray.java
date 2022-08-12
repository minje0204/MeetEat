package com.a105.domain.tray;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Tray {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "conference_id")
    private Long conferenceId;

    private String image;

    @Builder
    public Tray(Long userId, Long conferenceId, String image){
        this.userId = userId;
        this.conferenceId = conferenceId;
        this.image = image;
    }
}
