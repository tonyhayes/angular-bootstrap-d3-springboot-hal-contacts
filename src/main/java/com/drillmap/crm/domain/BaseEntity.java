package com.drillmap.crm.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by sfrensley on 3/29/14.
 */
@MappedSuperclass
@Data
public class BaseEntity implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}

