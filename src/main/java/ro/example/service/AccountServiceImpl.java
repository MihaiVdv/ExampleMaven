package ro.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.example.domain.Account;
import ro.example.repository.AccountRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Mihai on 2/9/14.
 */
@Service
@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account findById(BigDecimal idAccount) {
        return accountRepository.findOne(idAccount);
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Transactional
    @Override
    public Account updateAccount(Account account) {
        return accountRepository.save(account);
    }

    @Transactional
    @Override
    public void deleteAccount(BigDecimal idAccount) {
        accountRepository.delete(idAccount);
    }

}