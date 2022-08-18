package com.a105.api.service;

import com.a105.api.request.TrayRequest;
import com.a105.api.response.TrayDetailResponse;
import com.a105.api.response.TrayItemResponse;
import com.a105.domain.conference.Conference;
import com.a105.domain.conference.ConferenceRepository;
import com.a105.domain.tray.Tray;
import com.a105.domain.tray.TrayRepository;
import com.a105.exception.ResourceNotFoundException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrayService {
    @Value("${cloud.aws.cloudfront.domain}")
    private String distributionDomain;
    private final AwsS3Service storageService;
    private final TrayRepository trayRepository;
    private final ConferenceRepository conferenceRepository;
    public Tray saveTrayImage(Long userId, TrayRequest trayRequest){

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String datetime = sdf.format(new Date());
        String dirFileName = "tray/" + userId + "/" + datetime;

        String fileUrl = storageService.uploadBase64Image(trayRequest.getBase64(), dirFileName);

        Tray tray = Tray.builder()
            .userId(userId)
            .conferenceId(trayRequest.getConferenceId())
            .image(fileUrl)
            .build();

        return trayRepository.save(tray);
    }

    public List<TrayItemResponse> listTrayItems(){
        List<String> objectKeys = storageService.listObjects("tray_item");
        List<TrayItemResponse> trayItems = new ArrayList<>();

        objectKeys.forEach(key -> trayItems.add(TrayItemResponse.of(key, distributionDomain)));
        return trayItems;
    }

    public TrayDetailResponse getTrayDetail(Long id){
        Long conferenceId = trayRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tray", "id", id))
            .getConferenceId();
        Conference conference = conferenceRepository.findById(conferenceId)
            .orElseThrow(() -> new ResourceNotFoundException("Conference", "id", id));
        return TrayDetailResponse.of(conference.getTitle(), conference.getCallStartTime().toString());
    }

}
