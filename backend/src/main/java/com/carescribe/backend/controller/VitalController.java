package com.carescribe.backend.controller;

import com.carescribe.backend.entity.Vital;
import com.carescribe.backend.repository.VitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/consultations/{consultationId}/vitals")
public class VitalController {
    @Autowired
    private VitalRepository vitalRepository;

    @GetMapping
    public List<Vital> getVitals(@PathVariable Long consultationId) {
        return vitalRepository.findByConsultationId(consultationId);
    }

    @PostMapping
    public ResponseEntity<Vital> createVital(@PathVariable Long consultationId, @RequestBody Vital vital) {
        return ResponseEntity.ok(vitalRepository.save(vital));
    }
}
