package com.carescribe.backend.repository;

import com.carescribe.backend.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    List<FollowUp> findByPatientId(Long patientId);
}
