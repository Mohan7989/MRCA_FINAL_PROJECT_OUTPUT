package com.mohan.studentresources.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;

/**
 * Choose DataSource at runtime:
 * - If SPRING_DATASOURCE_URL is unset or appears to be a placeholder, use embedded H2 (safe for initial deploys).
 * - Otherwise build a HikariDataSource using SPRING_DATASOURCE_URL/USERNAME/PASSWORD/DRIVER.
 */
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(Environment env) {
        String url = env.getProperty("SPRING_DATASOURCE_URL");
        String user = env.getProperty("SPRING_DATASOURCE_USERNAME");
        String pass = env.getProperty("SPRING_DATASOURCE_PASSWORD");
        String driver = env.getProperty("SPRING_DATASOURCE_DRIVER");

        if (isMissingOrPlaceholder(url)) {
            System.out.println("No valid SPRING_DATASOURCE_URL provided — using embedded H2 database (in-memory).");
            return new EmbeddedDatabaseBuilder()
                    .setType(EmbeddedDatabaseType.H2)
                    .setName("studentdb")
                    .build();
        }

        // Build HikariDataSource for provided JDBC URL
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url);
        if (user != null) ds.setUsername(user);
        if (pass != null) ds.setPassword(pass);
        if (driver != null) ds.setDriverClassName(driver);
        // optional tuning
        String maxPool = env.getProperty("SPRING_DATASOURCE_MAX_POOL");
        if (maxPool != null) {
            try { ds.setMaximumPoolSize(Integer.parseInt(maxPool)); } catch (Exception ignored) {}
        }
        System.out.println("Using external datasource: " + url);
        return ds;
    }

    private boolean isMissingOrPlaceholder(String url) {
        if (url == null || url.isBlank()) return true;
        String lower = url.toLowerCase();
        // Treat obvious placeholders as missing
        if (lower.contains("<") || lower.contains("your_") || lower.contains("mysql_host") || lower.contains("placeholder")) return true;
        return false;
    }
}
