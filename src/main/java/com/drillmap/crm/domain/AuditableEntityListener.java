package com.drillmap.crm.domain;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Calendar;

/**
 * Created by sfrensley on 3/29/14.
 */
public class
        AuditableEntityListener {

    @PrePersist
    public void prePersist(AuditableEntity e) {
        e.setUpdatedAt(Calendar.getInstance());
        if (e.getCreatedAt() == null) {
            e.setCreatedAt(Calendar.getInstance());
        }
    }

    @PreUpdate
    public void preUpdate(AuditableEntity e) {
        e.setUpdatedAt(Calendar.getInstance());
    }
}
