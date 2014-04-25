package com.drillmap.crm.domain.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by tony on 4/2/14.
 */

@Embeddable
@Data
@EqualsAndHashCode
@ToString
public class OpportunityFormComponentOption {

    String option_id;
    String option_title;
    String option_value;

}
