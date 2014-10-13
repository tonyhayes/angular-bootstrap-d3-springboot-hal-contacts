package com.drillmap.crm.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import com.drillmap.crm.domain.entities.State;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface StateRepository extends TenantAwareRepository<State,Long> {


    @Query("select o from #{#entityName} o where " +
            "o.tenantId = :tenantId")
    public List<State> findAllStates( @Param(value="tenantId") Long tenantId);


}
