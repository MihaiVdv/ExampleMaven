package ro.example.service;

import ro.example.domain.Account;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */
public interface AccountService {

    Account createAccount(Account account);

    Account findById(BigDecimal idAccount);

    List<Account> findAll();

    Account updateAccount(Account account);

    void deleteAccount(BigDecimal idAccount);

}