package com.a105.api.service;

import com.a105.api.request.TrayRequest;
import com.a105.domain.tray.Tray;
import com.a105.domain.tray.TrayRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrayService {

    private final AwsS3Service storageService;
    private final TrayRepository trayRepository;
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

}
