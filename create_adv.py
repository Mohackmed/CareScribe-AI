import os

base_path = 'backend/src/main/java/com/carescribe/backend'
files = {
    'repository/FollowUpRepository.java': '''package com.carescribe.backend.repository;

import com.carescribe.backend.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    List<FollowUp> findByPatientId(Long patientId);
}
''',
    'controller/FollowUpController.java': '''package com.carescribe.backend.controller;

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
''',
    'repository/AuditLogRepository.java': '''package com.carescribe.backend.repository;

import com.carescribe.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
''',
    'controller/AuditController.java': '''package com.carescribe.backend.controller;

import com.carescribe.backend.entity.AuditLog;
import com.carescribe.backend.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditController {
    @Autowired
    private AuditLogRepository auditLogRepository;

    @GetMapping
    public List<AuditLog> getAuditLogs() {
        return auditLogRepository.findAll();
    }
}
''',
    'controller/DashboardController.java': '''package com.carescribe.backend.controller;

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
'''
}

for filename, content in files.items():
    with open(os.path.join(base_path, filename), 'w') as f:
        f.write(content)

print("Advanced features setup done.")
