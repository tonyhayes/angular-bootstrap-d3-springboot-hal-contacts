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
@Table(name = "app_crm_opportunities")
@Data
@EqualsAndHashCode(callSuper = true, exclude = {"opportunityDetails","opportunityFormItems"})
@ToString(callSuper = true, exclude = {"opportunityDetails","opportunityFormItems"})
public class Opportunity extends AuditableEntity {
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

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL)
    Set<OpportunityDetail> opportunityDetails;

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL)
    Set<OpportunityForm> opportunityFormItems;

}
