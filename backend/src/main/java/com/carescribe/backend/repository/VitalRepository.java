package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Vital;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VitalRepository extends JpaRepository<Vital, Long> {
    List<Vital> findByConsultationId(Long consultationId);
}
