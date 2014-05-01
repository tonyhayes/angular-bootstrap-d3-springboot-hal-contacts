package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunity_details")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class OpportunityDetail extends AuditableTenantEntity {
    @ManyToOne
    SalesPerson sales;
    Date followUpdate;
    String action;
    @ManyToOne
    Opportunity opportunity;

    public String getSalesPersonDescription() {
        SalesPerson s = getSales();
        if (s != null) {
            return s.getFirstName() + " " + s.getLastName();
        }
        return "No salesperson for this opportunity";
    }
    public Long getSalesPersonId() {
        SalesPerson s = getSales();
        if (s != null) {
            return s.getId();
        }
        return null;
    }


}
