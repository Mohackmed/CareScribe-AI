package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
