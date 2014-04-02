package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by anthonyhayes on 4/2/14.
 */
public interface StateRepository extends JpaRepository<State,Long> {
}
