package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableTenantEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
public class Company extends AuditableTenantEntity {
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
            return c.getContactDescription();
        }
        return "No Primary Contact";
    }
    public Long getPrimaryContactId() {
        Contact c = getPrimaryContact();
        if (c != null) {
            return c.getId();
        }
        return null;
    }

    public Integer getContactsCount() {
        Set<Contact> c = getContacts();
        if (c == null) {
            return 0;
        }
        return c.size();
    }
    public Integer getOpportunitiesCount() {
        Set<Opportunity> o = getOpportunities();
        if (o == null) {
            return 0;
        }
        return o.size();
    }

    public Long getCompanyId() {
        return getId();
    }


    @ManyToOne(cascade = CascadeType.ALL)
    Contact primaryContact;


    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    //unfortunately we have to tie ourselves to hibernate for this as jpa cascades with foreign keys do not appear to work
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<Contact> contacts;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    //unfortunately we have to tie ourselves to hibernate for this as jpa cascades with foreign keys do not appear to work
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<Opportunity> opportunities;

}
