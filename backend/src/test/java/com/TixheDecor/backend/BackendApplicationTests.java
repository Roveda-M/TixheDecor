package com.TixheDecor.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:tixhedecor_flyway_test;MODE=MySQL;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.flyway.enabled=true",
        "spring.flyway.locations=classpath:db/migration",
        "spring.flyway.clean-disabled=false",
        "spring.jpa.hibernate.ddl-auto=validate",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
class BackendApplicationTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
    }

    @Test
    void flywayMigratesCleanDatabaseAndCreatesExpectedSchema() {
        List<String> expectedTables = List.of(
                "roles",
                "users",
                "user_role",
                "user_claims",
                "user_tokens",
                "refresh_token",
                "klienti",
                "furnitori",
                "materiali",
                "projekti",
                "fatura",
                "pagesa",
                "punetori",
                "detyrimi_projektit",
                "materiali_projektit",
                "fotografia",
                "stock_movement",
                "vleresimi",
                "bride_to_be_request",
                "flyway_schema_history"
        );

        for (String tableName : expectedTables) {
            Integer tableCount = jdbcTemplate.queryForObject(
                    "select count(*) from information_schema.tables where table_schema = 'PUBLIC' and table_name = ?",
                    Integer.class,
                    tableName
            );
            assertThat(tableCount).as("table %s exists", tableName).isEqualTo(1);
        }

        Integer appliedMigrations = jdbcTemplate.queryForObject(
                "select count(*) from flyway_schema_history where success = true and version = '1'",
                Integer.class
        );
        assertThat(appliedMigrations).isEqualTo(1);
    }
}
