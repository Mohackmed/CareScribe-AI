package com.carescribe.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "phcs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Phc extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String name;
    
    private String address;
    private String contactNumber;
}
