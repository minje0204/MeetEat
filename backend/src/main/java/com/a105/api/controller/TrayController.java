package com.a105.api.controller;

import com.a105.api.request.TrayRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.TrayItemResponse;
import com.a105.api.service.TrayService;
import com.a105.domain.tray.Tray;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping(value = "/items")
    public ResponseEntity<?> getTrayItems(){
        List<TrayItemResponse> trayItems = trayService.listTrayItems();
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_TRAY_ITEMS, trayItems));
    }

}
