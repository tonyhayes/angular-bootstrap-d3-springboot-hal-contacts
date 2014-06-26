package com.drillmap.crm.domain.entities;

/**
 * Created by anthonyhayes on 6/26/14.
 */

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "app_crm_status")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Status extends AuditableTenantEntity {
    String name;
    String description;
    public Long getStatusId() {
        return getId();
    }

}
