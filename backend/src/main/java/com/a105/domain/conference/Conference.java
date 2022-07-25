package com.a105.domain.conference;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    private Long hostIdx;

    @Column(name = "call_start_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date callStartTime;

    @Column(name = "call_end_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date callEndTime;

    private String title;

    @Column(name = "max_user_num")
    private int maxUserNum;

    @Column(name = "food_tag")
    private String foodTag;

    private int restaurant;


}
