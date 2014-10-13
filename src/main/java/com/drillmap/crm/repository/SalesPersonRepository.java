package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.SalesPerson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface SalesPersonRepository extends TenantAwareRepository<SalesPerson, Long> {

    @Query(value = "select e from #{#entityName} e where " +
            "(lower(e.firstName) like :name or " +
            "lower(e.lastName) like :name) and " +
            "e.tenantId = :tenantId")
    public List<SalesPerson> findByName(
            @Param(value = "name") String name,
            @Param(value = "tenantId") Long tenantId);

    @Query("select o from #{#entityName} o where " +
            "o.tenantId = :tenantId")
    public List<SalesPerson> findAllSalesPersons( @Param(value="tenantId") Long tenantId);


}
