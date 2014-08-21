package com.drillmap.crm.security.legacy.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by sfrensley on 8/21/14.
 */
@Entity
@Table(name = "app_cust_group_authorities")
@Data
@EqualsAndHashCode
@ToString
public class CRMGrantedAuthority implements GrantedAuthority {

    @Id
    @Column(name = "id")
    Integer id;
    Integer groupId;
    String authority;

}
