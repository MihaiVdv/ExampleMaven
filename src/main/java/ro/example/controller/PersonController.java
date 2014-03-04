package ro.example.controller;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.example.domain.Person;
import ro.example.service.PersonService;
import ro.example.service.PersonService;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */

@Controller
@RequestMapping(value = "/rest/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> persontList(){
        List<Person> personList = personService.findAll();
        String personListJson = new JSONSerializer()
                .exclude("*.class")
                .serialize(personList);
        return new ResponseEntity<String>(personListJson, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> createPerson(@RequestBody String json){
        Person personTransient = new JSONDeserializer<Person>()
                .use(null, Person.class)
                .deserialize(json);
        if(personTransient.getId() != null)
            return new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE);
        Person personDetached = personService.createPerson(personTransient);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .serialize(personDetached), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> updatePerson(@RequestBody String json){
        Person personTransient = new JSONDeserializer<Person>()
                .use(null, Person.class)
                .deserialize(json);
        if(personService.findById(personTransient.getId()) == null)
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        Person personDetached = personService.updatePerson(personTransient);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .serialize(personDetached), HttpStatus.OK);
    }


    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getById(@PathVariable("id") BigDecimal id){
        Person person = personService.findById(id);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .serialize(person),HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable("id") BigDecimal idPerson){
        personService.deletePerson(idPerson);
    }
}
