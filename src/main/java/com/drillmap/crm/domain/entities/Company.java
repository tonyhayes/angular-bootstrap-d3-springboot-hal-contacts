package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by anthonyhayes on 4/1/14.
 */
@Entity
@Table(name = "app_crm_company")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
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
    @ManyToOne
    Contact primaryContact;


    @OneToMany(mappedBy = "company",fetch = FetchType.EAGER)
    Collection<Contact> contacts;
    @OneToMany(mappedBy = "company",fetch = FetchType.EAGER)
    Collection<Opportunity> opportunities;

}
