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
    private Long id;

    @Column(name = "user_id")
    private int userIdx;

    @Column(name = "conference_id")
    private int conferenceId;

    private int status;

    @Column(name = "is_read")
    private int isRead;
}
