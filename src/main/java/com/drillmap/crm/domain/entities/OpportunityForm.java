package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by tony on 4/2/14.
 *
 * this is data collected by the customer in a format unknown to me
 * how to describe ?
 *
 */
@Entity
@Table(name = "app_crm_opportunity_form_values")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class OpportunityForm extends AuditableTenantEntity {
    String name;
    String value;
    @ManyToOne
    Opportunity opportunity;
}
