package com.carescribe.backend.repository;

import com.carescribe.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
