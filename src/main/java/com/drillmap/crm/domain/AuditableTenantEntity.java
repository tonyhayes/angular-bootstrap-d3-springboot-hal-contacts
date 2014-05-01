package com.drillmap.crm.domain;

import com.drillmap.crm.domain.TenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Calendar;

/**
 * Created by sfrensley on 4/26/14.
 */
@MappedSuperclass
@EntityListeners(value = {AuditableTenantEntityListener.class})
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"createdAt", "updatedAt"})
@ToString(callSuper = true)
public class AuditableTenantEntity extends TenantEntity {
    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar updatedAt;
}
