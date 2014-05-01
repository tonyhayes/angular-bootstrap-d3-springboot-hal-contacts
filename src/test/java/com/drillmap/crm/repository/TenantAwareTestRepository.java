package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.TenantAwareTestEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


/**
 * Created by sfrensley on 4/29/14.
 */
public interface TenantAwareTestRepository extends TenantAwareRepository<TenantAwareTestEntity, Long> {

    Page<TenantAwareTestEntity> findByIdAndTenantId(@Param(value = "id") Long id, @Param(value = "tenantId") Long tenantId, Pageable page);
}
