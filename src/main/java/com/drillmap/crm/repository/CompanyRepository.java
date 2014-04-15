package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by anthonyhayes on 4/1/14.
 */
public interface CompanyRepository extends JpaRepository<Company,Long>{

    public Page<Company> findByCompanyNameStartsWithOrCityStartsWithOrStateStartsWithOrContactNameStartsWith(
            @Param(value = "companyName") String companyName,
            @Param(value = "city") String city,
            @Param(value = "state") String state,
            @Param(value = "contactName") String contactName,
            Pageable page);

    public List<Company> findByCompanyNameLike(
            @Param(value = "companyName") String companyName);


}
