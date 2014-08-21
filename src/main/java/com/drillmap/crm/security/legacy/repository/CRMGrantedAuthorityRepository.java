package com.drillmap.crm.security.legacy.repository;

import com.drillmap.crm.security.legacy.domain.CRMGrantedAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;

/**
 * Created by sfrensley on 8/21/14.
 */
@RepositoryRestResource(exported = false)
public interface CRMGrantedAuthorityRepository extends JpaRepository<CRMGrantedAuthority,Integer> {

    @Query(value = "select id,group_id,authority from app_cust_group_authorities " +
        "where group_id in (select distinct(group_id) from app_cust_group_members where uid = :id)",
        nativeQuery = true)
    public Set<CRMGrantedAuthority> findAuthoritiesForUser(@Param(value = "id") Integer id);
}
