package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Company;
import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.OpportunityForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    public Page<Opportunity> findByCompany(@Param(value = "company") Company company, Pageable page);

}
