package com.drillmap.crm.security.legacy.repository;

import com.drillmap.crm.security.legacy.domain.CRMUserCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by sfrensley on 8/12/14.
 */
@RepositoryRestResource(exported = false)
public interface CRMUserCompanyRepository extends JpaRepository<CRMUserCompany, Integer>{
}
