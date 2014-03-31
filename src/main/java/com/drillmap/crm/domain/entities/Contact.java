package com.drillmap.crm.domain.entities;

import com.drillmap.crm.domain.AuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
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
}
