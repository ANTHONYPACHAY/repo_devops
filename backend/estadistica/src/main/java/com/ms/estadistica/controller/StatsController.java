package com.ms.estadistica.controller;

import com.ms.estadistica.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping
    public List<?> getAllStats() {
        return statsService.getAllStats();
    }
}
