package ro.example.service;

import org.springframework.data.domain.Page;
import ro.example.domain.Person;

import java.awt.print.Pageable;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */
public interface PersonService  {

    Person createPerson(Person person);

    Person findById(BigDecimal idPerson);

    List<Person> findAll();

    Person updatePerson(Person person);

    void deletePerson(BigDecimal idPerson);

    Page<Person> findAllPage(org.springframework.data.domain.Pageable pageable);
}
