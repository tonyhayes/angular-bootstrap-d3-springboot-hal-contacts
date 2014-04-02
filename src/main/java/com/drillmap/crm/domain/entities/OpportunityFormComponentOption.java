package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunity_form_component_option")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class OpportunityFormComponentOption extends AuditableEntity {

    String option_id;
    String option_title;
    String option_value;
    @ManyToOne
    OpportunityFormComponent opportunityFormComponent;

}
