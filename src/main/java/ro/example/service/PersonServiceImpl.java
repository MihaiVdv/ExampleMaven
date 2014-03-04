package ro.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.example.domain.Person;
import ro.example.repository.PersonRepository;

import java.awt.print.Pageable;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */
@Service
@Transactional(readOnly = true)
public class PersonServiceImpl implements PersonService {

    private PersonRepository personRepository;

    @Autowired
    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Transactional
    @Override
    public Person createPerson(Person person) {
        return personRepository.save(person);
    }

    @Override
    public Person findById(BigDecimal idPerson) {
        return personRepository.findOne(idPerson);
    }

    @Override
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    @Transactional
    @Override
    public Person updatePerson(Person person) {
        return personRepository.save(person);
    }

    @Transactional
    @Override
    public void deletePerson(BigDecimal idPerson) {
        personRepository.delete(idPerson);
    }

    @Override
    public Page<Person> findAllPage(org.springframework.data.domain.Pageable pageable) {
        return personRepository.findAll(pageable);
    }

}