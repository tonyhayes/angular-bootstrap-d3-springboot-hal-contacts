package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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

    @OneToMany(mappedBy = "company",fetch = FetchType.EAGER)
    Collection<Contact> contacts = new ArrayList<Contact>();
}
