package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by anthonyhayes on 4/1/14.
 */
public interface CompanyRepository extends TenantAwareRepository<Company,Long>{


    @Query(value = "select e from #{#entityName} e where " +
            "e.companyName like :companyName and " +
            "e.city like :city and " +
            "e.state like :state and " +
            "e.contactName like :contactName and " +
            "e.tenantId = :tenantId")
    public Page<Company> findByCompanyNameStartsWithOrCityStartsWithOrStateStartsWithOrContactNameStartsWith(
            @Param(value = "companyName") String companyName,
            @Param(value = "city") String city,
            @Param(value = "state") String state,
            @Param(value = "contactName") String contactName,
            @Param(value = "tenantId") Long tenantId, Pageable page);

    @Query(value = "select e from #{#entityName} e where " +
            "e.companyName like :companyName and " +
            "e.tenantId = :tenantId")
    public Page<Company> findByCompanyNameLike(
            @Param(value = "companyName") String companyName, @Param(value = "tenantId") Long tenantId, Pageable page);


}
