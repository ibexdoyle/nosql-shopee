//package com.example.order_service.config;
//
//import com.datastax.oss.driver.api.core.CqlSession;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
//import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;
//
//import java.net.InetSocketAddress;
//
//@Configuration
//@EnableCassandraRepositories(basePackages = "com.example.order_service.repository")
//public class CassandraConfig extends AbstractCassandraConfiguration {
//
//    @Value("${spring.data.cassandra.keyspace-name}")
//    private String keyspace;
//
//    @Value("${spring.data.cassandra.contact-points}")
//    private String contactPoints;
//
//    @Value("${spring.data.cassandra.port}")
//    private int port;
//
//    @Value("${spring.data.cassandra.local-datacenter}")
//    private String datacenter;
//
//    @Override
//    protected String getKeyspaceName() {
//        return keyspace;
//    }
//
//    @Override
//    protected String getContactPoints() {
//        return contactPoints;
//    }
//
//    @Override
//    protected int getPort() {
//        return port;
//    }
//
//    @Override
//    protected String getLocalDataCenter() {
//        return datacenter;
//    }
//}
//
