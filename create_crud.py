import os

base_path = 'backend/src/main/java/com/carescribe/backend'
files = {
    'repository/PatientRepository.java': '''package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
''',
    'repository/ConsultationRepository.java': '''package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPatientId(Long patientId);
}
''',
    'repository/VitalRepository.java': '''package com.carescribe.backend.repository;

import com.carescribe.backend.entity.Vital;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VitalRepository extends JpaRepository<Vital, Long> {
    List<Vital> findByConsultationId(Long consultationId);
}
''',
    'service/PatientService.java': '''package com.carescribe.backend.service;

import com.carescribe.backend.entity.Patient;
import com.carescribe.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }
    
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }
}
''',
    'controller/PatientController.java': '''package com.carescribe.backend.controller;

import com.carescribe.backend.entity.Patient;
import com.carescribe.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.createPatient(patient));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
''',
    'controller/ConsultationController.java': '''package com.carescribe.backend.controller;

import com.carescribe.backend.entity.Consultation;
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
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        return ResponseEntity.ok(consultationRepository.save(consultation));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable Long id) {
        return consultationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
''',
    'controller/VitalController.java': '''package com.carescribe.backend.controller;

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
'''
}

for filename, content in files.items():
    with open(os.path.join(base_path, filename), 'w') as f:
        f.write(content)

print("CRUD setup done.")
