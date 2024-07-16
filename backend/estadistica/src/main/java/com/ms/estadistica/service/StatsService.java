package com.ms.estadistica.service;

import com.ms.estadistica.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StatsService {

    @Autowired
    private StatsRepository statsRepository;

    public List<Map<String, Object>> getAllStats() {
        return statsRepository.getStats();
    }
}
