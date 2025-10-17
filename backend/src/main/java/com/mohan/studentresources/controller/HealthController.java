package com.mohan.studentresources.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "message", "Backend is running!");
    }

    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Test endpoint working!");
    }
}