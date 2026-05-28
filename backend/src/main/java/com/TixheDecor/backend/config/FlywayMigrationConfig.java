package com.TixheDecor.backend.config;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.MigrationVersion;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.util.Arrays;

@Configuration
public class FlywayMigrationConfig {

    @Bean
    public Flyway flyway(DataSource dataSource, Environment environment) {
        String[] locations = environment.getProperty(
                "spring.flyway.locations",
                "classpath:db/migration"
        ).split(",");

        boolean baselineOnMigrate = Boolean.parseBoolean(environment.getProperty(
                "spring.flyway.baseline-on-migrate",
                "false"
        ));
        String baselineVersion = environment.getProperty("spring.flyway.baseline-version", "1");
        boolean validateOnMigrate = Boolean.parseBoolean(environment.getProperty(
                "spring.flyway.validate-on-migrate",
                "true"
        ));
        boolean repairBeforeMigrate = Boolean.parseBoolean(environment.getProperty(
                "spring.flyway.repair-before-migrate",
                "false"
        ));

        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations(Arrays.stream(locations).map(String::trim).toArray(String[]::new))
                .baselineOnMigrate(baselineOnMigrate)
                .baselineVersion(MigrationVersion.fromVersion(baselineVersion))
                .validateOnMigrate(validateOnMigrate)
                .load();

        if (repairBeforeMigrate) {
            flyway.repair();
        }

        flyway.migrate();
        return flyway;
    }

    @Bean
    public static BeanFactoryPostProcessor jpaDependsOnFlyway() {
        return new BeanFactoryPostProcessor() {
            @Override
            public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
                if (!beanFactory.containsBeanDefinition("entityManagerFactory")) {
                    return;
                }

                BeanDefinition beanDefinition = beanFactory.getBeanDefinition("entityManagerFactory");
                String[] existingDependsOn = beanDefinition.getDependsOn();
                if (existingDependsOn == null || existingDependsOn.length == 0) {
                    beanDefinition.setDependsOn("flyway");
                    return;
                }

                String[] dependsOn = Arrays.copyOf(existingDependsOn, existingDependsOn.length + 1);
                dependsOn[dependsOn.length - 1] = "flyway";
                beanDefinition.setDependsOn(dependsOn);
            }
        };
    }
}
