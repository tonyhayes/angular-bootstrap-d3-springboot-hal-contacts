package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Probability;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface ProbabilityRepository extends TenantAwareRepository<Probability, Long> {

    @Query(value = "select e from #{#entityName} e where " +
            "e.name like :name and " +
            "e.tenantId = :tenantId")
    public Page<Probability> findByName(
            @Param(value = "name") String name,
            @Param(value = "tenantId") Long tenantId, Pageable page);


}
