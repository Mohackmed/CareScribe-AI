package com.carescribe.backend.controller;

import com.carescribe.backend.entity.FollowUp;
import com.carescribe.backend.repository.FollowUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/followups")
public class FollowUpController {
    @Autowired
    private FollowUpRepository followUpRepository;

    @GetMapping
    public List<FollowUp> getAllFollowUps() {
        return followUpRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<FollowUp> createFollowUp(@RequestBody FollowUp followUp) {
        return ResponseEntity.ok(followUpRepository.save(followUp));
    }
}
