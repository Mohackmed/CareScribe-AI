package com.carescribe.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;
    private String userId;
    private String action;
    private String resourceType;
    private String resourceId;
    private String result;
    private String ipAddress;
    private String userAgent;

    @Column(columnDefinition = "TEXT")
    private String metadata;
}
