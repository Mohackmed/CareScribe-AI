import os

filepath = 'backend/src/main/java/com/carescribe/backend/controller/ConsultationController.java'

with open(filepath, 'r') as f:
    content = f.read()

replacement = '''
    @PostMapping("/{id}/submit-review")
    public ResponseEntity<Consultation> submitReview(@PathVariable Long id) {
        return consultationRepository.findById(id).map(c -> {
            c.setReviewStatus(com.carescribe.backend.entity.ConsultationStatus.PENDING_REVIEW);
            return ResponseEntity.ok(consultationRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Consultation> approve(@PathVariable Long id) {
        return consultationRepository.findById(id).map(c -> {
            c.setReviewStatus(com.carescribe.backend.entity.ConsultationStatus.APPROVED);
            return ResponseEntity.ok(consultationRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Consultation> reject(@PathVariable Long id) {
        return consultationRepository.findById(id).map(c -> {
            c.setReviewStatus(com.carescribe.backend.entity.ConsultationStatus.REJECTED);
            return ResponseEntity.ok(consultationRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }
}
'''

new_content = content.replace('}', replacement, 1)

with open(filepath, 'w') as f:
    f.write(new_content)
