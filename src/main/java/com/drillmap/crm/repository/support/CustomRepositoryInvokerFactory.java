package com.drillmap.crm.repository.support;

import com.drillmap.crm.repository.TenantAwareRepository;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.support.Repositories;
import org.springframework.data.rest.core.invoke.*;
import org.springframework.util.Assert;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sfrensley on 4/27/14.
 */
public class CustomRepositoryInvokerFactory extends DefaultRepositoryInvokerFactory {

    private final Repositories repositories;
    private final ConversionService conversionService;
    private final Map<Class<?>, RepositoryInvoker> invokers;

    /**
     * Creates a new {@link DefaultRepositoryInvokerFactory} for the given {@link Repositories} and
     * {@link ConversionService}.
     *
     * @param repositories must not be {@literal null}.
     * @param conversionService must not be {@literal null}.
     */
    public CustomRepositoryInvokerFactory(Repositories repositories, ConversionService conversionService) {
        super(repositories, conversionService);

        Assert.notNull(repositories, "Repositories must not be null!");
        Assert.notNull(conversionService, "ConversionService must not be null!");

        this.repositories = repositories;
        this.conversionService = conversionService;
        this.invokers = new HashMap<Class<?>, RepositoryInvoker>();

    }

    /**
     * Creates a {@link RepositoryInvoker} for the repository managing the given domain type.
     *
     * @param domainType
     * @return
     */
    @SuppressWarnings("unchecked")
    private RepositoryInvoker prepareInvokers(Class<?> domainType) {

        Object repository = repositories.getRepositoryFor(domainType);
        RepositoryInformation information = repositories.getRepositoryInformationFor(domainType);

        if (repository instanceof TenantAwareRepository) {
            //TODO
            return new TenantAwareRepositoryInvoker((TenantAwareRepository<Object, Serializable>) repository,
                    information, conversionService);
        } else if (repository instanceof PagingAndSortingRepository) {
            return new PagingAndSortingRepositoryInvoker((PagingAndSortingRepository<Object, Serializable>) repository,
                    information, conversionService);
        } else if (repository instanceof CrudRepository) {
            return new CrudRepositoryInvoker((CrudRepository<Object, Serializable>) repository, information,
                    conversionService);
        } else {
            return new ReflectionRepositoryInvoker(repository, information, conversionService);
        }
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvokerFactory#getInvokerFor(java.lang.Class)
     */
    public RepositoryInvoker getInvokerFor(Class<?> domainType) {

        RepositoryInvoker invoker = invokers.get(domainType);

        if (invoker != null) {
            return invoker;
        }

        invoker = prepareInvokers(domainType);
        invokers.put(domainType, invoker);

        return invoker;
    }
}
