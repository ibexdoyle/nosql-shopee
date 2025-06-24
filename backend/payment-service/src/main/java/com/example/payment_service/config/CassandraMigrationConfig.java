package com.example.payment_service.config;

import jakarta.annotation.PostConstruct;
import org.cognitor.cassandra.migration.Database;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.datastax.oss.driver.api.core.CqlSession;

import java.io.IOException;
import java.util.List;

@Configuration
public class CassandraMigrationConfig {

    private final CqlSession session;

    public CassandraMigrationConfig(CqlSession session) {
        this.session = session;
    }

    @PostConstruct
    public void migrate() throws IOException {
        List<String> scripts = List.of(
                "cassandra/migration/V1__create_payment_tables.cql"
        );

        for (String script : scripts) {
            String content = new String(
                    getClass().getClassLoader().getResourceAsStream(script).readAllBytes()
            );

            for (String statement : content.split(";")) {
                if (!statement.trim().isEmpty()) {
                    session.execute(statement);
                }
            }
        }
    }

}