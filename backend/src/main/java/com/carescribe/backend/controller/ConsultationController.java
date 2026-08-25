package com.carescribe.backend.controller;

import com.carescribe.backend.entity.Consultation;
import com.carescribe.backend.entity.ConsultationStatus;
import com.carescribe.backend.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @GetMapping
    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Consultation> createConsultation(
            @RequestBody Consultation consultation) {
        return ResponseEntity.ok(consultationRepository.save(consultation));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(
            @PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/submit-review")
    public ResponseEntity<Consultation> submitReview(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(c -> {
                    c.setReviewStatus(ConsultationStatus.PENDING_REVIEW);
                    return ResponseEntity.ok(consultationRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Consultation> approve(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(c -> {
                    c.setReviewStatus(ConsultationStatus.APPROVED);
                    return ResponseEntity.ok(consultationRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Consultation> reject(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(c -> {
                    c.setReviewStatus(ConsultationStatus.REJECTED);
                    return ResponseEntity.ok(consultationRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}