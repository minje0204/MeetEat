package com.a105.api.controller;

import com.a105.api.service.ConferenceService;
import com.a105.domain.conference.Conference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/conference")
public class ConferenceController {

    private ConferenceService conferenceService;

    @GetMapping("/{idx}")
    private ResponseEntity<List<Conference>> getAllConferences(){
        List<Conference> list = conferenceService.findAll();
        return new ResponseEntity<List<Conference>>(list, HttpStatus.OK);
    }
}
