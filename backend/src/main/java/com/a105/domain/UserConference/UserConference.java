package com.a105.domain.UserConference;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "user_conference")
public class UserConference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "user_idx")
    private int userIdx;

    @Column(name = "conference_idx")
    private int conferenceIdx;

    private int action;

}
