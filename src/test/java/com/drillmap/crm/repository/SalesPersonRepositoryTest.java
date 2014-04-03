package com.drillmap.crm.repository;
import com.drillmap.crm.domain.entities.SalesPerson;

import com.drillmap.crm.TestConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

/**
 * Created by anthonyhayes on 4/3/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@SpringApplicationConfiguration(classes = TestConfig.class)
@Transactional
public class SalesPersonRepositoryTest {
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    SalesPersonRepository salesPersonRepository;

    @Test
    public void testSalesPersonFind() {
        SalesPerson mySalesPerson = new SalesPerson();
        mySalesPerson.setFirstName("Sheila");
        SalesPerson mySavedSalesPerson = salesPersonRepository.save(mySalesPerson);

        List<SalesPerson> people = salesPersonRepository.findAll();
        assertThat(people.size(), is(greaterThan(0)));
        assertThat(people.get(0).getId(), is(greaterThan(0L)));
    }

}
