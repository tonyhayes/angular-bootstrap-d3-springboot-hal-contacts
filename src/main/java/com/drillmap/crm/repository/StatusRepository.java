package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Created by anthonyhayes on 6/26/14.
 */
public interface StatusRepository extends TenantAwareRepository<Status,Long>{

    @Query(value = "select e from #{#entityName} e where " +
            "lower(e.name) like :name and " +
            "e.tenantId = :tenantId")
    public List<Status> findByName(
            @Param(value = "name") String name,
            @Param(value = "tenantId") Long tenantId);

    @Query("select o from #{#entityName} o where " +
            "o.tenantId = :tenantId")
    public List<Status> findAllStatuses( @Param(value="tenantId") Long tenantId);

}
