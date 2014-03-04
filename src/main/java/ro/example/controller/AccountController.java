package ro.example.controller;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.example.domain.Account;
import ro.example.service.AccountService;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */
@Controller
@RequestMapping("/rest/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> accountList(){
        List<Account> accountList = accountService.findAll();
        String accountListJson = new JSONSerializer()
                .exclude("*.class")
                .exclude("person")
                .serialize(accountList);
        return new ResponseEntity<String>(accountListJson, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> createAccount(@RequestBody String json){
        Account accountTransient = new JSONDeserializer<Account>()
                .use(null, Account.class)
                .deserialize(json);
        if(accountTransient.getId() != null)
            return new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE);
        Account accountDetached = accountService.createAccount(accountTransient);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .exclude("person")
                .serialize(accountDetached), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<String> updateAccount(@RequestBody String json){
        Account accountTransient = new JSONDeserializer<Account>()
                .use(null, Account.class)
                .deserialize(json);
        if(accountService.findById(accountTransient.getId()) == null)
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        Account accountDetached = accountService.updateAccount(accountTransient);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .exclude("person")
                .serialize(accountDetached), HttpStatus.OK);
    }


    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getById(@PathVariable("id") BigDecimal id){
        Account account = accountService.findById(id);
        return new ResponseEntity<String>(new JSONSerializer()
                .exclude("*.class")
                .exclude("person")
                .serialize(account),HttpStatus.OK);
    }

    @RequestMapping(value = "/delete" ,method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> deleteAccount(@RequestBody String idAccount){
        accountService.deleteAccount(BigDecimal.valueOf(Integer.valueOf(idAccount.trim())));
        return new ResponseEntity<String>(HttpStatus.OK);
    }

}
