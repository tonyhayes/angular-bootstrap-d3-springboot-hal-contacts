package com.drillmap.crm.repository;

import com.drillmap.crm.Application;
import com.drillmap.crm.TestConfig;
import com.drillmap.crm.domain.entities.TenantAwareTestEntity;

import com.drillmap.crm.repository.extensions.invoker.TenantAwareRepositoryInvoker;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.core.invoke.RepositoryInvoker;
import org.springframework.data.rest.core.invoke.RepositoryInvokerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.greaterThan;


/**
 * Created by sfrensley on 4/29/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@SpringApplicationConfiguration(classes = TestConfig.class)
@Transactional
public class TenantAwareRepositoryInvokerTest {

    @Autowired
    public RepositoryInvokerFactory repositoryInvokerFactory;

    private User user;

    @Before
    public void setUp() {
        user = new Application.TestUser("testuser", "", true, true,
                true, true, AuthorityUtils.createAuthorityList("USER"),1L);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user,"",user.getAuthorities()));
    }

    @Test
    public void testSave() {

        TenantAwareTestEntity e = generateTenantAwareTestEntity();
        saveEntity(e);
        assertNotNull(e.getId());
    }

    @Test
    public void testFindOne() {
        TenantAwareTestEntity e = generateTenantAwareTestEntity();
        saveEntity(e);
        TenantAwareTestEntity x = getInvoker(e).invokeFindOne(e.getId());
        assertNotNull(x.getTenantId());
        assertNotNull(x.getId());
    }

    @Test
    public void testDelete() {
        TenantAwareTestEntity e = generateTenantAwareTestEntity();
        saveEntity(e);
        assertNotNull(e.getTenantId());
        assertNotNull(e.getId());
        getInvoker(e).invokeDelete(e.getId());
        TenantAwareTestEntity x = getInvoker(e).invokeFindOne(e.getId());
        assertNull(x);
    }

    @Test
    public void testQueryMethod() throws Exception {
        //create an entity to find
        TenantAwareTestEntity e  = generateTenantAwareTestEntity();
        e = saveEntity(e);
        //lookup query
        Method method = TenantAwareTestRepository.class.getMethod("findByIdAndTenantId", Long.class, Long.class, Pageable.class);
        assertNotNull(method);
        //empty pageable
        Pageable page = new PageRequest(0,10);
        //parameters to query - invoker should populate tenantId
        Map<String,String[]> parameters = new HashMap<String, String[]>();
        parameters.put("id", new String[]{e.getId().toString()});
        //find test repository
        RepositoryInvoker invoker = getInvoker(TenantAwareTestEntity.class);
        //invoke query
        Object results = invoker.invokeQueryMethod(method,parameters,page,null);
        assertNotNull(results);
        assertThat(results, instanceOf(Page.class));
        Page<TenantAwareTestEntity> pages = (Page<TenantAwareTestEntity>) results;
        assertThat(pages.getNumberOfElements(), greaterThan(0));

    }

    private TenantAwareTestEntity generateTenantAwareTestEntity() {
        TenantAwareTestEntity e = new TenantAwareTestEntity();
        e.setTenantId(1L);
        return e;
    }

    private RepositoryInvoker getInvoker(TenantAwareTestEntity e) {
        assertNotNull(e);
        return getInvoker(e.getClass());
    }

    private RepositoryInvoker getInvoker(Class clazz) {
        assertNotNull(clazz);
        RepositoryInvoker invoker = repositoryInvokerFactory.getInvokerFor(clazz);
        assertNotNull(invoker);
        assertThat(invoker, instanceOf(TenantAwareRepositoryInvoker.class));
        return invoker;
    }

    private TenantAwareTestEntity saveEntity(TenantAwareTestEntity e) {
        assertNotNull(e);
        RepositoryInvoker invoker = getInvoker(e.getClass());
        return invoker.invokeSave(e);
    }
}
