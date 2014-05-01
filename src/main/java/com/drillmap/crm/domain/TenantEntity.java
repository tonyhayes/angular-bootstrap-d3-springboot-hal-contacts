package com.drillmap.crm.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * Created by sfrensley on 4/26/14.
 */
@MappedSuperclass
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class TenantEntity extends BaseEntity {

    @JsonIgnore
    @Column(nullable = false)
    private Long tenantId;
}
