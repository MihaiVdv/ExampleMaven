package ro.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseFactory;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.jpa.AbstractEntityManagerFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.AbstractJpaVendorAdapter;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;


/**
 * Created by Mihai on 2/9/14.
 */

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = {"ro.example.repository"})
@ComponentScan(basePackages = {"ro.example.service"})
public class InfrastructureConfig {

    @Bean(destroyMethod = "shutdown")
    @Autowired
    public DataSource dataSource(DatabasePopulator databasePopulator) {
        EmbeddedDatabaseFactory factory = new EmbeddedDatabaseFactory();
        factory.setDatabaseName("spring-social-showcase");
        factory.setDatabaseType(EmbeddedDatabaseType.H2);
        factory.setDatabasePopulator(databasePopulator);
        return factory.getDatabase();
    }

    @Bean
    public DatabasePopulator databasePopulator() {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new ClassPathResource("structures.sql"));
        populator.addScript(new ClassPathResource("data.sql"));
        return populator;
    }
    protected
    @Bean
    JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter ret = new HibernateJpaVendorAdapter();
        return completeVendor(ret);
    }

    private AbstractJpaVendorAdapter completeVendor(AbstractJpaVendorAdapter jpaVendorAdapter) {
        jpaVendorAdapter.setDatabase(Database.H2);
        jpaVendorAdapter.setGenerateDdl(true);
        jpaVendorAdapter.setShowSql(true);
        return jpaVendorAdapter;
    }

    @Bean
    @Autowired
    AbstractEntityManagerFactoryBean entityManagerFactory
            (JpaVendorAdapter jpaVendorAdapter, DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean containerEntityManagerFactoryBean =
                new LocalContainerEntityManagerFactoryBean();
        containerEntityManagerFactoryBean.setDataSource(dataSource);
        containerEntityManagerFactoryBean.setJpaVendorAdapter(jpaVendorAdapter);
        containerEntityManagerFactoryBean.setPackagesToScan(domainPackages());
        return containerEntityManagerFactoryBean;
    }

    private   String[] domainPackages(){
        return new String[]{"ro.example.domain"};
    }

    @Bean
    @Autowired
    public org.springframework.transaction.PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
