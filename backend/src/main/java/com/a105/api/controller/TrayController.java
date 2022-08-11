package com.a105.api.controller;

import com.a105.api.request.TrayRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.service.AwsS3Service;
import com.a105.api.service.TrayService;
import com.a105.domain.tray.Tray;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import javax.imageio.ImageIO;
import javax.swing.filechooser.FileSystemView;
import javax.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.a105.api.response.ResponseMessage.*;
@RestController
@RequestMapping("/tray")
@RequiredArgsConstructor
public class TrayController {

    private final TrayService trayService;

    @PostMapping
    public ResponseEntity<?> uploadTrayImage(@CurrentUser UserPrincipal userPrincipal, @RequestBody TrayRequest trayRequest) {
        Tray savedTray = trayService.saveTrayImage(userPrincipal.getId(), trayRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPLOAD_TRAY_IMAGE, savedTray));
    }

}
