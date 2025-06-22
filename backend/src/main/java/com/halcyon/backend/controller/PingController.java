package com.halcyon.backend.controller;

import com.halcyon.backend.dto.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping")
public class PingController {

    @GetMapping
    public ResponseEntity<SuccessResponse> ping() {
        return ResponseEntity.ok(new SuccessResponse("22FAM HACKATHON #1"));
    }
}
