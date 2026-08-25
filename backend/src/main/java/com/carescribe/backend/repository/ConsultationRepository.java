package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPatientId(Long patientId);
}
