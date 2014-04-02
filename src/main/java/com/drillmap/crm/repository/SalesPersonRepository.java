package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.SalesPerson;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface SalesPersonRepository extends JpaRepository<SalesPerson, Long> {
}
