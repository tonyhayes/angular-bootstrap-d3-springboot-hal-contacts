package com.drillmap.crm.domain;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Calendar;

/**
 * Created by sfrensley on 4/26/14.
 */
public class AuditableTenantEntityListener {
    @PrePersist
    public void prePersist(AuditableTenantEntity e) {
        e.setUpdatedAt(Calendar.getInstance());
        if (e.getCreatedAt() == null) {
            e.setCreatedAt(Calendar.getInstance());
        }
    }

    @PreUpdate
    public void preUpdate(AuditableTenantEntity e) {
        e.setUpdatedAt(Calendar.getInstance());
    }
}
