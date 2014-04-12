package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by anthonyhayes on 4/1/14.
 */
@Entity
@Table(name = "app_crm_company")
@Data
@EqualsAndHashCode(callSuper = true,exclude = {"contacts", "opportunities" , "primaryContact"})
@ToString(callSuper = true,exclude = {"contacts", "opportunities", "primaryContact"})
public class Company extends AuditableEntity {
    String companyName;
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
    String contactName;

    public String getPrimaryContactDescription() {
        Contact c = getPrimaryContact();
        if (c != null) {
            return c.getFirstName() + " " + c.getLastName();
        }
        return "No Primary Contact";
    }


    @ManyToOne
    Contact primaryContact;


    @OneToMany(mappedBy = "company",fetch = FetchType.EAGER)
    Set<Contact> contacts;
    @OneToMany(mappedBy = "company",fetch = FetchType.EAGER)
    Set<Opportunity> opportunities;

}
