package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.OpportunityForm;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
}
