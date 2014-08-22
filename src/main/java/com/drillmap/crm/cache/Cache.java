package com.drillmap.crm.cache;

import com.google.common.cache.CacheBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.util.Assert;

import java.util.concurrent.TimeUnit;

/**
 * Created by sfrensley on 8/22/14.
 */
public class Cache implements org.springframework.cache.Cache {

    private static final Logger logger = LoggerFactory.getLogger(Cache.class);

    private ConcurrentMapCache cache;

    public Cache(String name) {
        cache = new ConcurrentMapCache(name);
    }

    public Cache(String name, long maxSize) {
        cache = new ConcurrentMapCache(name, CacheBuilder.newBuilder().maximumSize(maxSize).build().asMap(), false);
    }

    public Cache(String name, long duration, TimeUnit unit, long maxSize) {
        this(name, duration, unit, maxSize, false);
    }

    public Cache(String name, long duration, TimeUnit unit, long maxSize, boolean expireAfterAccess) {
        Assert.notNull(unit, "Please provide a time unit.");

        if (expireAfterAccess) {
            cache = new ConcurrentMapCache(name, CacheBuilder.newBuilder().expireAfterAccess(duration, unit).maximumSize(maxSize).build().asMap(), false);
        } else {
            cache = new ConcurrentMapCache(name, CacheBuilder.newBuilder().expireAfterWrite(duration, unit).maximumSize(maxSize).build().asMap(), false);
        }
    }

    @Override
    public String getName() {
        return cache.getName();
    }

    @Override
    public Object getNativeCache() {
        return cache;
    }

    @Override
    public ValueWrapper get(Object key) {
        logger.debug("getting value for object with key: " + key + " from cache " + getName());
        return cache.get(key);
    }

    @Override
    public <T> T get(Object key, Class<T> type) {
        logger.debug("getting value for object with key: " + key + " from cache " + getName());
        return cache.get(key, type);
    }

    @Override
    public void put(Object key, Object value) {
        logger.debug("caching value associated with key: " + key + " in cache " + getName());
        cache.put(key,value);
    }

    @Override
    public void evict(Object key) {
        logger.debug("evicting cache object with key: " + key);
        cache.evict(key);
    }

    @Override
    public void clear() {
        logger.debug("clearing cache: " + getName());
        cache.clear();
    }
}
