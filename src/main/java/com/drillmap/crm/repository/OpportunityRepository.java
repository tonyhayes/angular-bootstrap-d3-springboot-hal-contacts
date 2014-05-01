package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Company;
import com.drillmap.crm.domain.entities.Opportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface OpportunityRepository extends TenantAwareRepository<Opportunity, Long> {

    @Query("select o from #{#entityName} o where " +
            "o.company = :company and " +
            "o.tenantId = :tenantId")
    public Page<Opportunity> findByCompany(@Param(value = "company") Company company, @Param(value="tenantId") Long tenantId, Pageable page);

    @Query("select o from #{#entityName} o where " +
            "o.company = :company and " +
            "o.tenantId = :tenantId")
    public List<Opportunity> findAllByCompany(@Param(value = "company") Company company, @Param(value="tenantId") Long tenantId);

}
