//package com.example.order_service.config;
//
//import com.datastax.oss.driver.api.core.CqlSession;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//
//import java.net.InetSocketAddress;
//import org.cognitor.cassandra.migration.CassandraMigration;
//
//@Configuration
//public class CassandraMigrationConfig {
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
//    @PostConstruct
//    public void runMigration() {
//        CqlSession session = CqlSession.builder()
//                .addContactPoint(new InetSocketAddress(contactPoints, port))
//                .withLocalDatacenter(datacenter)
//                .build();
//
//        CassandraMigration migration = new CassandraMigration();
//        migration.getConfiguration()
//                .setSession(session)
//                .setKeyspace("order_keyspace") // Keyspace cần được tạo trong V1__create_keyspace.cql
//                .setScriptsLocation("cassandra/migration"); // Đặt file V1__create_keyspace.cql tại src/main/resources/cassandra/migration
//
//        migration.migrate();
//        session.close();
//    }
//}
//
