package com.drillmap.crm.repository.support;

import com.drillmap.crm.domain.TenantEntity;
import com.drillmap.crm.repository.TenantAwareRepository;
import com.drillmap.crm.security.TenantAwareUser;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.core.CrudMethods;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.core.invoke.RepositoryInvoker;
import org.springframework.hateoas.core.AnnotationAttribute;
import org.springframework.hateoas.core.MethodParameters;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by sfrensley on 4/27/14.
 */
public class TenantAwareRepositoryInvoker implements RepositoryInvoker {

    private static final AnnotationAttribute PARAM_ANNOTATION = new AnnotationAttribute(Param.class);
    private final TenantAwareRepository<Object, Serializable> repository;
    private final CrudMethods methods;
    private final RepositoryInformation information;
    private final ConversionService conversionService;

    /**
     * Creates a new {@link com.drillmap.crm.repository.support.PagingAndSortingRepositoryInvoker} using the given repository, {@link org.springframework.data.repository.core.RepositoryInformation}
     * and {@link org.springframework.core.convert.ConversionService}.
     *
     * @param repository        must not be {@literal null}.
     * @param information       must not be {@literal null}.
     * @param conversionService must not be {@literal null}.
     */
    public TenantAwareRepositoryInvoker(TenantAwareRepository<Object, Serializable> repository, RepositoryInformation information, ConversionService conversionService) {
        Assert.notNull(repository, "Repository must not be null!");
        Assert.notNull(information, "RepositoryInformation must not be null!");
        Assert.notNull(conversionService, "ConversionService must not be null!");

        this.repository = repository;
        this.methods = information.getCrudMethods();
        this.information = information;
        this.conversionService = conversionService;
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#hasFindAllMethod()
     */
    @Override
    public boolean hasFindAllMethod() {
        return methods.hasFindAllMethod();
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#exposesFindAll()
     */
    @Override
    public boolean exposesFindAll() {
        return methods.hasFindAllMethod() && exposes(methods.getFindAllMethod());
    }

    /* (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvoker#invokeFindAll(org.springframework.data.domain.Sort)
     */
    @Override
    @SuppressWarnings("unchecked")
    public Iterable<Object> invokeFindAll(Sort sort) {
        return (Iterable<Object>) invoke(methods.getFindAllMethod(), sort, convertId(getTenantId()));
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvoker#invokeFindAll(org.springframework.data.domain.Pageable)
     */
    @Override
    public Iterable<Object> invokeFindAll(Pageable pageable) {

        if (!exposesFindAll()) {
            return Collections.emptyList();
        }

        Method method = methods.getFindAllMethod();
        Class<?>[] types = method.getParameterTypes();

        if (types.length == 0) {
            return invoke(method, convertId(getTenantId()));
        }

        if (Sort.class.isAssignableFrom(types[0])) {
            return invoke(method, pageable == null ? null : pageable.getSort(), convertId(getTenantId()));
        }

        return repository.findAll(getTenantId(),pageable);
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#hasSaveMethod()
     */
    @Override
    public boolean hasSaveMethod() {
        return methods.hasSaveMethod();
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#exposesSave()
     */
    @Override
    public boolean exposesSave() {
        return methods.hasSaveMethod() && exposes(methods.getSaveMethod());
    }

    /* (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvoker#invokeSave(java.lang.Object)
     */
    @Override
    public <T> T invokeSave(T object) {
        //do not allow tenant objects to be saves without tenantId being set
        if (object instanceof TenantEntity) {
            TenantEntity e = (TenantEntity) object;
            //TODO: fix cast to be more dynamic
            e.setTenantId((Long)getTenantId());
        }
        return invoke(methods.getSaveMethod(), object);
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#hasFindOneMethod()
     */
    @Override
    public boolean hasFindOneMethod() {
        return methods.hasFindOneMethod();
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#exposesFindOne()
     */
    @Override
    public boolean exposesFindOne() {
        return methods.hasFindOneMethod() && exposes(methods.getFindOneMethod());
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvoker#invokeFindOne(java.io.Serializable)
     */
    @Override
    public <T> T invokeFindOne(Serializable id) {
        return (T) repository.findOne(convertId(id),getTenantId());
        //return invoke(methods.getFindOneMethod(), convertId(id), convertId(getTenantId()));
    }


    /*
	 * (non-Javadoc)
	 * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#hasDeleteMethod()
	 */
    @Override
    public boolean hasDeleteMethod() {
        return methods.hasDelete();
    }

    /*
     * (non-Javadoc)
     * @see org.springframework.data.rest.core.invoke.RepositoryInvocationInformation#exposesDelete()
     */
    @Override
    public boolean exposesDelete() {
        return methods.hasDelete() && exposes(methods.getDeleteMethod());
    }

    /*
	 * (non-Javadoc)
	 * @see org.springframework.data.rest.core.invoke.RepositoryInvoker#invokeDelete(java.io.Serializable)
	 */
    @Override
    public void invokeDelete(Serializable id) {

        Method method = methods.getDeleteMethod();

        if (method.getParameterTypes()[0].equals(Serializable.class)) {
            repository.delete(convertId(id), getTenantId());
        } else {
            //invokeFindOne will guard against the wrong tenant being accessed
            repository.delete(repository.findOne(convertId(id)));
        }
    }

    private boolean exposes(Method method) {

        RestResource annotation = AnnotationUtils.findAnnotation(method, RestResource.class);
        return annotation == null ? true : annotation.exported();
    }

    @Override
    public Object invokeQueryMethod(Method method, Map<String, String[]> parameters, Pageable pageable, Sort sort) {
        return invoke(method, prepareParameters(method, parameters, pageable, sort));
    }

    private Object[] prepareParameters(Method method, Map<String, String[]> rawParameters, Pageable pageable, Sort sort) {

        List<MethodParameter> parameters = new MethodParameters(method, PARAM_ANNOTATION).getParameters();

        if (parameters.isEmpty()) {
            return new Object[0];
        }

        Object[] result = new Object[parameters.size()];
        Sort sortToUse = pageable == null ? sort : pageable.getSort();

        for (int i = 0; i < result.length; i++) {

            MethodParameter param = parameters.get(i);

            Class<?> targetType = param.getParameterType();

            if (Pageable.class.isAssignableFrom(targetType)) {
                result[i] = pageable;
            } else if (Sort.class.isAssignableFrom(targetType)) {
                result[i] = sortToUse;
            } else {

                String parameterName = param.getParameterName();

                if (!StringUtils.hasText(parameterName)) {
                    throw new IllegalArgumentException("No @Param annotation found on query method " + method.getName()
                            + " for parameter " + parameterName);
                }
                Object value;
                if (parameterName.equals("tenantId")) {
                    value = getTenantId();
                } else {
                    String[] parameterValue = rawParameters.get(parameterName);
                    value = parameterValue == null ? null : parameterValue.length == 1 ? parameterValue[0] : parameterValue;
                }
                result[i] = conversionService.convert(value, TypeDescriptor.forObject(value), new TypeDescriptor(param));
            }
        }

        return result;
    }

    /**
     * Invokes the given method with the given arguments on the backing repository.
     *
     * @param method
     * @param arguments
     * @return
     */
    @SuppressWarnings("unchecked")
    private <T> T invoke(Method method, Object... arguments) {
        return (T) ReflectionUtils.invokeMethod(method, repository, arguments);
    }

    /**
     * Converts the given id into the id type of the backing repository.
     *
     * @param id must not be {@literal null}.
     * @return
     */
    protected Serializable convertId(Serializable id) {
        Assert.notNull(id, "Id must not be null!");
        return conversionService.convert(id, information.getIdType());
    }

    /**
     * Checks current authentication and returns correct tenant or exception
     * @return
     */
    private Serializable getTenantId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new IllegalStateException("Authentication is required for tenant awareness.");
        }
        Object principal = auth.getPrincipal();
        if (principal instanceof TenantAwareUser) {
            TenantAwareUser user = (TenantAwareUser) principal;
            return user.getTenantId();
        } else {
            throw new IllegalStateException("Principal must implement TenantAware user for tenant awareness.");
        }
    }
}
