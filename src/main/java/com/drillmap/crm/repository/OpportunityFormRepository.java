package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.OpportunityForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface OpportunityFormRepository extends JpaRepository<OpportunityForm, Long> {

    public List<OpportunityForm> findByOpportunity(@Param(value = "opportunity") Opportunity opportunity);

}
