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
@Table(name = "app_crm_form_component_option")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class FormComponentOption extends AuditableEntity {

    String option_id;
    String option_title;
    String option_value;

    public String getFieldDescription() {
        FormComponent o = getComponent();
        if (o != null) {
            return o.getField_id();
        }
        return "No field association";
    }


    @ManyToOne
    FormComponent component;

}
