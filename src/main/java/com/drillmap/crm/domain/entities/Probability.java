package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_probabilities")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Probability extends AuditableTenantEntity {
    String name;
    Integer percentage;

    public Long getProbabilityId() {
        return getId();
    }

}
