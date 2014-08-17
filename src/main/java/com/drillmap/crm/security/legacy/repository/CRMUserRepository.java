package com.drillmap.crm.security.legacy.repository;

import com.drillmap.crm.security.legacy.domain.CRMUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by sfrensley on 8/12/14.
 */
@RepositoryRestResource(exported = false)
public interface CRMUserRepository extends JpaRepository<CRMUser, Integer> {
    @Query(value = "select u.*, u.trial, u.status, c.company as compname from app_users u " +
           "join app_user_companies c on u.owner = c.id " +
           "where lower(username) = lower(:username)", nativeQuery = true)
    public CRMUser findByUsername(@Param(value = "username") String username);
}
