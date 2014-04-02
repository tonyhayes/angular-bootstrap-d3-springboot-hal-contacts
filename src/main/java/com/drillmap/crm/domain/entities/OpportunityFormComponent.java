package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunity_form_component")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class OpportunityFormComponent extends AuditableEntity {

    String field_id;
    String field_title;
    String field_type;
    String field_value;
    String field_placeholder;
    String field_required;

    @OneToMany(mappedBy = "opportunityFormComponent",fetch = FetchType.EAGER)
    Collection<OpportunityFormComponentOption> options;


}
