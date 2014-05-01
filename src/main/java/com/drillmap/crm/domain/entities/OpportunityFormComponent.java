package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunity_form_component")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"options"})
@ToString(callSuper = true, exclude = {"options"})
public class OpportunityFormComponent extends AuditableTenantEntity {

    String field_id;
    String field_title;
    String field_type;
    String field_value;
    String field_placeholder;
    String field_required;
    Integer fieldSequence;

    public Integer getOptionsCount() {
        List<OpportunityFormComponentOption> o = getOptions();
        if (o == null) {
            return 0;
        }
        return o.size();
    }

    @ElementCollection
    @CollectionTable(name = "app_crm_opportunity_form_component_option", joinColumns = @JoinColumn(name="component_id"))
    List<OpportunityFormComponentOption> options;


}
