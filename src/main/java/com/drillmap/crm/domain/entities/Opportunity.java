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
 * Created by tony on 4/2/14.
 */
@Entity
@Table(name = "app_crm_opportunities")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"opportunityDetails","opportunityForms"})
@ToString(callSuper = true, exclude = {"opportunityDetails","opportunityForms"})
public class Opportunity extends AuditableTenantEntity {
    @ManyToOne
    Company company;
    @ManyToOne
    SalesPerson sales;
    @ManyToOne
    Contact contact;
    @ManyToOne
    Probability probability;
    String discussion;
    String potentialRevenue;

    public String getContactDescription() {
        Contact c = getContact();
        if (c != null) {
            return c.getFirstName() + " " + c.getLastName();
        }
        return "No contact for this opportunity";
    }
    public Long getContactId() {
        Contact c = getContact();
        if (c != null) {
            return c.getId();
        }
        return null;
    }
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

    public String getProbabilityDescription() {
        Probability p = getProbability();
        if (p != null) {
            return p.getName();
        }
        return "No probability for this opportunity";
    }
    public Long getProbabilityId() {
        Probability p = getProbability();
        if (p != null) {
            return p.getId();
        }
        return null;
    }

    public Integer getOpportunityFormItemsCount() {
        Set<OpportunityForm> o = getOpportunityForms();
        if (o == null) {
            return 0;
        }
        return o.size();
    }

    // the following is temporary until I learn to do a join

    public Long getCompanyId() {
        Company c = getCompany();
        if (c != null) {
            return c.getId();
        }
        return null;
    }
    public String getCompanyName() {
        Company c = getCompany();
        if (c != null) {
            return c.getCompanyName();
        }
        return null;
    }
    public String getCity() {
        Company c = getCompany();
        if (c != null) {
            return c.getCity();
        }
        return null;
    }
    public String getState() {
        Company c = getCompany();
        if (c != null) {
            return c.getState();
        }
        return null;
    }
    public Integer getOpportunitiesCount() {
        Company c = getCompany();
        if (c != null) {
            return c.getOpportunitiesCount();
        }
        return null;
    }
    public Integer getContactsCount() {
        Company c = getCompany();
        if (c != null) {
            return c.getContactsCount();
        }
        return null;
    }

    // end temporary


    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true)
    //unfortunately we have to tie ourselves to hibernate for this as jpa cascades with foreign keys do not appear to work
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<OpportunityDetail> opportunityDetails;

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true)
    //unfortunately we have to tie ourselves to hibernate for this as jpa cascades with foreign keys do not appear to work
    @OnDelete(action = OnDeleteAction.CASCADE)
    Set<OpportunityForm> opportunityForms;

}
