package com.drillmap.crm.repository;
import com.drillmap.crm.domain.entities.Probability;

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
public class ProbabilityRepositoryTest {
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    ProbabilityRepository probabilityRepository;

    @Test
    public void tesProbabilityFind() {
        Probability myProbability = new Probability();
        myProbability.setName("50%");
        Probability mySavedProbability = probabilityRepository.save(myProbability);

        List<Probability> probabilities = probabilityRepository.findAll();
        assertThat(probabilities.size(), is(greaterThan(0)));
        assertThat(probabilities.get(0).getId(), is(greaterThan(0L)));
    }

}
