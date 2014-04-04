package com.drillmap.crm.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Calendar;

/**
 * Created by sfrensley on 3/29/14.
 */
@MappedSuperclass
@EntityListeners(value = {AuditableEntityListener.class})
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"createdAt", "updatedAt"})
@ToString(callSuper = true)
public class AuditableEntity extends BaseEntity {

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar updatedAt;

}
