package com.carescribe.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPatients", 120);
        stats.put("consultationsToday", 15);
        stats.put("pendingReviews", 3);
        stats.put("followUpsToday", 5);
        return stats;
    }
}
