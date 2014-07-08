package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Company;
import com.drillmap.crm.domain.entities.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by sfrensley on 3/29/14.
 */
public interface ContactRepository extends TenantAwareRepository<Contact,Long> {

    @Query("select c from #{#entityName} c where " +
            "lower(c.firstName) = :firstName and " +
            "c.tenantId = :tenantId")
    public Page<Contact> findByFirstName(@Param(value = "firstName") String firstName, @Param(value="tenantId") Long tenantId, Pageable page);

    @Query("select c from #{#entityName} c where " +
            "lower(c.lastName) = :lastName and " +
            "c.tenantId = :tenantId")
    public Page<Contact> findByLastName(@Param(value = "lastName") String lastName, @Param(value="tenantId") Long tenantId, Pageable page);

    @Query("select c from #{#entityName} c where " +
            "c.company = :company and " +
            "c.tenantId = :tenantId")
    public Page<Contact> findByCompany(@Param(value = "company") Company company, @Param(value="tenantId") Long tenantId, Pageable page);

    @Query("select c from #{#entityName} c where " +
            "c.company = :company and " +
            "c.tenantId = :tenantId")
    public List<Contact> findAllByCompany(@Param(value = "company") Company company, @Param(value="tenantId") Long tenantId);

    @Query("select c from #{#entityName} c where " +
            "(lower(c.firstName) like :firstName or " +
            "lower(c.lastName) like :lastName or " +
            "lower(c.city) like :city or " +
            "lower(c.state) like :state) and " +
            "c.company = :company and " +
            "c.tenantId = :tenantId")
    public Page<Contact> findBySearch(@Param(value = "firstName") String firstName,
                                      @Param(value = "lastName") String lastName,
                                      @Param(value = "city") String city,
                                      @Param(value = "state") String state,
                                      @Param(value = "company") Company company,
                                      @Param(value="tenantId") Long tenantId,
                                      Pageable page
    );

}
