package com.a105.domain.friend;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
