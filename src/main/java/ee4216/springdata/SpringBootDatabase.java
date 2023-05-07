package ee4216.springdata;

import ee4216.springdata.jdbc.ToDoListDao;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class SpringBootDatabase {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootDatabase.class, args);
    }

    @Bean
    public ToDoListDao courseDao(JdbcTemplate jdbcTemplate) {
        return new ToDoListDao(jdbcTemplate);
    }

}
