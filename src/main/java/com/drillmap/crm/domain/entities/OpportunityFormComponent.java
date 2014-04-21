package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunity_form_component")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"options"})
@ToString(callSuper = true, exclude = {"options"})
public class OpportunityFormComponent extends AuditableEntity {

    String field_id;
    String field_title;
    String field_type;
    String field_value;
    String field_placeholder;
    String field_required;

    public Integer getOptionsCount() {
        Set<OpportunityFormComponentOption> o = getOptions();
        if (o == null) {
            return 0;
        }
        return o.size();
    }



    @OneToMany(mappedBy = "component")
    Set<OpportunityFormComponentOption> options;


}
