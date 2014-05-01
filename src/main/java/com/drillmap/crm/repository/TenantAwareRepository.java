package com.drillmap.crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;


/**
 * Created by sfrensley on 4/26/14.
 * Created to overide calls on to tenantAwareRepository to a defined tenant (see and @{RepositoryRestMvcConfiguration.class}
 * No overrides should be exporeted because they will show up in the search methods. Also, search methods can only have one method
 * per path. Thus, the multiple findAlls will conflict.
 */
@NoRepositoryBean
public interface TenantAwareRepository<T,ID extends Serializable> extends JpaRepository<T, ID> {


    /**
     * See DefaultCrudMethods.class for information about how suitable findAll methods are selected (pageable over sort over none)
     * @param pageable
     * @return
     */



    @Query("select e from #{#entityName} e where e.tenantId = :tenantId")
    Iterable<T> findAllSorted( @Param(value = "tenantId") ID tenantId, Sort pageable);

    @Query("select e from #{#entityName} e where e.tenantId = :tenantId")
    Page<T> findAll( @Param(value = "tenantId") ID tenantId, Pageable pageable);

    @Query("select e from #{#entityName} e where e.id = :id and e.tenantId = :tenantId")
    T findOne(@Param(value = "id") ID id, @Param(value = "tenantId") ID tenantId);

    @Modifying
    @Transactional
    @Query("delete from #{#entityName} e where e.id = :id and e.tenantId = :tenantId")
    void delete(@Param(value = "id") ID id, @Param(value = "tenantId") ID tenantId);


}
