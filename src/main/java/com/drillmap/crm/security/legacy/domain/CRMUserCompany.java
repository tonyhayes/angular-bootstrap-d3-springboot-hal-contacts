package com.drillmap.crm.security.legacy.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sfrensley on 8/12/14.
 */
@Entity
@Table(name = "app_user_companies")
@Data
public class CRMUserCompany {
    @Id
    @Column(name = "id")
    private Integer id;
    private String company;
    private Boolean enabled;
}
