package com.a105.domain.friend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "user_idx")
    private int userIdx;

    @Column(name = "conference_idx")
    private int conferenceIdx;

    private int status;

    @Column(name = "is_read")
    private int isRead;
}
