package ro.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.example.domain.Person;

import java.math.BigDecimal;

/**
 * Created by Mihai on 2/9/14.
 */
@Repository
public interface PersonRepository extends JpaRepository<Person, BigDecimal> {
}
