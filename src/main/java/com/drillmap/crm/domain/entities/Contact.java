package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by sfrensley on 3/29/14.
 */
@Entity
@Table(name = "app_crm_contacts")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Contact extends AuditableEntity {
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

    @ManyToOne(optional = false) //owning side of the relationship
    Company company;
}
