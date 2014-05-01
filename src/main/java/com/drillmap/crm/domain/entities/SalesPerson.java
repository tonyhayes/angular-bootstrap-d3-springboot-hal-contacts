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
@Table(name = "app_crm_sales_people")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class SalesPerson extends AuditableTenantEntity {
    String firstName;
    String lastName;
    String title;
    String addressLine1;
    String addressLine2;
    String city;
    String state;
    String zip;
    String email;
    String phone;
    String cell;
    String webPage;
    String notes;

    public String getSalesPersonDescription() {
        return getFirstName() + " " + getLastName();
    }
    public Long getSalesPersonId() {
            return getId();
    }


}
