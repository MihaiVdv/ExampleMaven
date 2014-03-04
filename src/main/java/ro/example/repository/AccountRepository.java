package ro.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.example.domain.Account;

import java.math.BigDecimal;

/**
 * Created by Mihai on 2/9/14.
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, BigDecimal>{
}
